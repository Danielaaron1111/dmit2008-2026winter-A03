const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
  <section class="h-100">
    <div class="card h-100">
      <div class="card-header d-flex justify-content-between align-items-center">
        <strong>Results</strong>
        <span class="badge text-bg-secondary">4</span>
      </div>

      <div class="list-group list-group-flush d-flex flex-column flex-fill">

        <!-- results will be injected here, by selecting for .list-group and embedding inner HTML -->

      </div>
    </div>
  </section>`;

// Step 3: ResourceResults should react to received filter state
class ResourceResults extends HTMLElement {
  #results = [];
  #filteredResults = [];
  #filters = {
    searchQuery: '',
    category: 'all',
    openNow: false,
    virtual: false,
  };

  constructor() {
    super();
    this._handleResultClick = this._handleResultClick.bind(this); 
    this.attachShadow({ mode: 'open' });
  }

  set results(data) {
    this.#results = data;
    this.#filteredResults = [...data];
    this.render();
  }

  set filters(incomingFilters) {
    this.#filters = incomingFilters;
    this.#applyFilters()
  }

  #applyFilters() {
    // Now that I'm sure of the data shape, I can prepare work on this.
    const { searchQuery, category, openNow, virtual } = this.#filters;
    const q = searchQuery.trim().toLowerCase();

    this.#filteredResults = this.#results.filter(
      // Yup, big comments. For what you'll learn, you'll hate me this weekend, and thank me later!
      (item) => {
        // Include the item filteredResults if this function returns truthy.
        // Item must pass ALL checks below (searchbox, category, checkboxes).

        // ----------------------------------------------------------------------------------------
        // We can chain the || (OR) operator for conciseness. 
        //   condition1 || condition2 || condition3 ...
        //
        // Returns the first truthy value, then stops — just like if -> else if -> else chains!
        // If nothing works out along the way, it just returns the last value.

        // We can repurpose this as:    
        //   !filterWasUsed || condition1 || condition2 ... 
        // 
        // If filter was *not used*, any value is acceptable -> pass the check immediately.
        // Otherwise, continue down the chain of conditions until something matches (or you reach the last term).
        // ----------------------------------------------------------------------------------------


        // Let's start with the searchbox string.
        // If we join all relevant text fields into one string, we can just see if our query string is in it.
        const matchesSearchQuery = !q || [item.title, item.summary, item.location].join(' ').toLowerCase().includes(q);
        // Empty strings are falsey, so:
        //   1) searchbox empty    -> q is "" -> !q is true  -> returns true, check passes.
        //   2) searchbox has text            -> !q is false -> .includes() check runs.
        //      -> if .includes() finds a match: return true, check passes. No match: return false, check fails.

        // Same idea, more terms in the chain.
        const matchesCategory = !category || category === 'all' || 
          item.category.toLowerCase() === category.toLowerCase();
        // 1) no category specified -> nothing to filter -> return true, chain stops, check passes.
        // 2) category is 'all'     -> nothing to filter -> return true, chain stops, check passes. 
        // 3) some other category   -> only pass if item.category matches the string (extracted from the button).

        // I left the checkboxes for last, because starting with them would have been a headache:
        // "Return true to pass test, but unchecked checkboxes are false, then if it's checked, item.openNow can be true or false".
        // Yeah no thanks. But now we know what we're looking at:
        const matchesOpenNow = !openNow || item.openNow;
        // If checkbox is checked, only include item if item.openNow is true 
        const matchesVirtual = !virtual || item.virtual;
        // If checkbox is checked, only include item if item.virtual is true 

        // Item must have passed ALL checks above (&& is AND) to be included in the filtered array.
        return matchesSearchQuery && matchesCategory && matchesOpenNow && matchesVirtual;
      });
    
    this.render();
  }

  _handleResultClick(event) {
    const button = event.target.closest('button[data-id]');
    if (button) {
      this.shadowRoot.querySelector('button.active')?.classList.remove('active');
      button.classList.add('active');

      const resultID = button.getAttribute('data-id');
      const result = this.#results.find(r => r.id === resultID);

      const resultSelectedEvent = new CustomEvent(
        'resource-selected',
        {
          detail: { result },
          bubbles: true,
          composed: true,
        }
      );

      this.dispatchEvent(resultSelectedEvent);
    }
  }

  connectedCallback() {
    this.shadowRoot.addEventListener('click', this._handleResultClick);
    this.render();
  }

  disconnectedCallback () {
    this.shadowRoot.removeEventListener('click', this._handleResultClick);
  }
  
  render() {
    const content = template.content.cloneNode(true)
    const listGroup = content.querySelector('.list-group');

    if (this.#filteredResults.length) {
      const resultsHTML = this.#filteredResults.map(
        result => `
        <button type="button" class="list-group-item list-group-item-action flex-fill" data-id="${result.id}">
          <div class="d-flex w-100 justify-content-between">
            <h2 class="h6 mb-1">${result.title}</h2>
            <small>${result.category}</small>
          </div>
          <p class="mb-1 small text-body-secondary">${result.summary}</p>
          <small class="text-body-secondary">${result.location}</small>
        </button>`
      ); 

      listGroup.innerHTML = resultsHTML.join('');

    } else {
      listGroup.innerHTML = `
        <div class="list-group-item">
          <p class="mb-0">No results found.</p>
        </div>`;
    }

    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(content);
  }
}

customElements.define('resource-results', ResourceResults);