import Icon from './Icon';

const PaginationFooter = (props) => {
  const currentPage = props.currentPage;
  return (
    <>
      <div className="px-3 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
        <span className="flex col-span-3 mt-2 sm:mt-auto sm:justify-end">
          <p className="text-base mt-1">Page {currentPage}</p>
          <ul className="ml-6 inline-flex items-center">
            <li>
              <button>
                <Icon
                  iconClass="fa fa-arrow-circle-left"
                  fontSize="20px"
                  fontColor="black"
                />
              </button>
            </li>
            <li>
              <button>
                <Icon
                  iconClass="fa fa-arrow-circle-right"
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
