import { useState } from "react";
import ButtonWithChildren from "../Buttons/ButtonWithChildren";
import ArrowDropPrev from "../../assets/Icons/ArrowDropPrev";
import ArrowDropNext from "../../assets/Icons/ArrowDropNext";
import ArrowFromNext from "../../assets/Icons/ArrowFromNext";
import ArrowFromPrev from "../../assets/Icons/ArrowFromPrev";

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

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
          ? "bg-primary-red-600"
          : "border border-primary-red-600 bg-transparent";
      pageNumbers.push(
        <span
          key={i}
          className={`cursor-pointer h-8 w-8 flex justify-center items-center mr-2 rounded ${isActive}`}
          onClick={() => handleClick(i)}
        >
          {i}
        </span>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center mt-3">
      <ButtonWithChildren action={() => jumpToPage(-5)}>
        <ArrowFromPrev />
      </ButtonWithChildren>
      <ButtonWithChildren action={goToPrev}>
        <ArrowDropPrev />
      </ButtonWithChildren>
      {renderPageNumbers()}
      <ButtonWithChildren action={goToNext}>
        <ArrowDropNext />
      </ButtonWithChildren>
      <ButtonWithChildren action={() => jumpToPage(5)}>
        <ArrowFromNext />
      </ButtonWithChildren>
    </div>
  );
};

export default Pagination;
