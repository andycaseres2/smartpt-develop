import { useState } from "react";
import ButtonWithChildren from "../Buttons/ButtonWithChildren";
import ArrowDropPrev from "../../assets/Icons/ArrowDropPrev";
import ArrowDropNext from "../../assets/Icons/ArrowDropNext";
import ArrowFromNext from "../../assets/Icons/ArrowFromNext";
import ArrowFromPrev from "../../assets/Icons/ArrowFromPrev";
import { useLocation } from "react-router-dom";
import { getColor } from "../../utils/getColor";

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const currentPath = location.pathname;

  const totalPages = 20; // Total de páginas
  const pagesToShow = 5; // Número de páginas a mostrar

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const goToPrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const jumpToPage = (increment) => {
    setCurrentPage((prevPage) =>
      Math.max(Math.min(prevPage + increment, totalPages), 1)
    );
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage, endPage;

    if (currentPage <= 5) {
      startPage = 1;
      endPage = Math.min(pagesToShow, totalPages);
    } else if (currentPage + 2 >= totalPages) {
      startPage = Math.max(totalPages - pagesToShow + 1, 1);
      endPage = totalPages;
    } else {
      const remainder = (currentPage - 1) % pagesToShow;
      startPage = currentPage - remainder;
      endPage = startPage + pagesToShow - 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      const isActive =
        currentPage === i
          ? getColor(currentPath).bg
          : `border ${getColor(currentPath).border} bg-transparent`;
      pageNumbers.push(
        <span
          key={i}
          className={`cursor-pointer h-7 w-7 flex justify-center items-center mr-2 rounded ${isActive}`}
          onClick={() => handleClick(i)}
        >
          {i}
        </span>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center mt-2">
      <ButtonWithChildren
        borderColor={getColor(currentPath).border}
        action={() => jumpToPage(-5)}
      >
        <ArrowFromPrev color={getColor(currentPath).hex} />
      </ButtonWithChildren>
      <ButtonWithChildren
        borderColor={getColor(currentPath).border}
        action={goToPrev}
      >
        <ArrowDropPrev color={getColor(currentPath).hex} />
      </ButtonWithChildren>
      {renderPageNumbers()}
      <ButtonWithChildren
        borderColor={getColor(currentPath).border}
        action={goToNext}
      >
        <ArrowDropNext color={getColor(currentPath).hex} />
      </ButtonWithChildren>
      <ButtonWithChildren
        borderColor={getColor(currentPath).border}
        action={() => jumpToPage(5)}
      >
        <ArrowFromNext color={getColor(currentPath).hex} />
      </ButtonWithChildren>
    </div>
  );
};

export default Pagination;
