import React from "react";
// npm i query-string
import queryString from "query-string";
import { Pagination as PaginationSUI } from "semantic-ui-react";
import { useRouter } from "next/router";

export default function Pagination(props) {
  const { totalProductsCategory, page, limitPerPage } = props;
  const totalPages = Math.ceil(totalProductsCategory / limitPerPage);
  //sacar la url y poder construir la url de la pagina
  const router = useRouter();
  //console.log(router);

  // extrae la url y la query
  const urlParse = queryString.parseUrl(router.asPath);
  //console.log(urlParse);

  // función para cambiar la página
  const goToPage = newPage => {
    //console.log(newPage)
    urlParse.query.page = newPage;
    const url = queryString.stringifyUrl(urlParse);
    //console.log(url);
    router.push(url);
  };

  return (
    <div className="pagination">
      <PaginationSUI
        defaultActivePage={page}
        totalPages={totalPages}
        firstItem={null}
        lastItem={null}
        onPageChange={(_, data) => goToPage(data.activePage)}
        boundaryRange={0}
        siblingRange={1}
        ellipsisItem={null}
      />
    </div>
  );
}
