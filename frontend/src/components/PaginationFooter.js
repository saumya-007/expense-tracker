import Icon from './Icon';

const PaginationFooter = (props) => {
  const currentPage = props.currentPage;
  return (
    <>
      <div className="">
        <span className="">
          <p className="">Page {currentPage}</p>
          <ul className="">
            <li>
              <button>
                <Icon
                  iconClass=""
                  fontSize="20px"
                  fontColor="black"
                />
              </button>
            </li>
            <li>
              <button>
                <Icon
                  iconClass=""
                  fontSize="20px"
                  fontColor="black"
                />
              </button>
            </li>
          </ul>
        </span>
      </div>      
    </>
  );
};

export default PaginationFooter;
