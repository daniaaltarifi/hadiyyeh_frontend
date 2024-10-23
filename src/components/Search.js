import React from 'react';

const Search = () => {
  return (
    <div className="container mt-4" style={{ width: '100%', height: '10px' }}> {/* Custom width and height */}
      <br />
      <div className="row justify-content-center" style={{ height: '100%' }}>
        <div className="col-12 col-md-10 col-lg-8">
          <form className="card card-sm" style={{ height: '100%' }}>
            <div className="card-body row no-gutters align-items-center">
              <div className="col-auto">
                <i className="fas fa-search h4 text-body"></i>
              </div>
              {/* Search input */}
              <div className="col">
                <input 
                  className="form-control form-control-lg form-control-borderless" 
                  type="search" 
                  placeholder="Search topics or keywords" 
                  style={{ width: '100%' }} // Make input take full width
                />
              </div>
              {/* Search button */}
              <div className="col-auto">
                <button className="btn btn-lg btn-success" type="submit">Search</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;
