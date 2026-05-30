import esewaLogo from '../assets/head.jpg';

const styles = `
  @import "tailwindcss";

  * {
    font-family: 'Roboto', sans-serif;
  }

  /* Header */

  header {
    background: #1c252e;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    height: 70px;
    top: 0;
    z-index: 50;
  }

  .gleslogo {
    width: 100px;
    height: 25px;
    flex-shrink: 0;
  }

  .glheader-inner {
    width: 100%;
    padding: 0 15px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
  }

  .glheader-left {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .glsearch-wrap {
    position: relative;
    width: 470px;
  }

  .glsch-icon {
    position: absolute;
    height: 16px;
    width: 16px;
    top: 8px;
    left: 8px;
  }

  .glsearch-wrap input {
    width: 100%;
    background: #28323c;
    border: none;
    color: white;
    padding: 7px 14px 7px 36px;
    font-size: 13px;
    font-family: inherit;
    outline: none;
    border-radius: 6px;
  }

  .glsearch-wrap input:focus {
    background: white;
    color: black;
  }

  .glsearch-wrap input::placeholder {
    color: #888;
  }
`;

export default function Header() {
    return (
        <>
            <style>{styles}</style>
            <header>
                <div className="glheader-inner">
                    <div className="glheader-left">
                        <img className="gleslogo" src={esewaLogo} alt="eSewa Logo" />
                        <div className="glsearch-wrap">
                            <img className="glsch-icon" src="src/assets/icons/searchIcon.png" alt="search" />
                            <input className="glesewa-search" type="text" placeholder="Search services/merchant by tags (e.g. adsl)" />
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
