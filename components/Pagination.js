import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  return (
    <nav>
      <ul className="flex justify-center">
        {pageNumbers.map((number) => (
          <li key={number} className="px-2">
            <a onClick={() => paginate(number)} className="page-link">
              <div className="cursor-pointer px-4 py-2 mt-10 font-bold text-lg text-center dark:bg-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300">
                {number}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
