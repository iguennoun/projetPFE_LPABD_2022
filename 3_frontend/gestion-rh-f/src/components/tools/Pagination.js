const Pagination = (props) => {
    const {loadPages, total, page, size, setObject, url}= props;

    const nbrPages = Math.ceil(total/size);
    let listPages = [];

    const shownNbr = 7;
    const haflShownNbr = Math.ceil(shownNbr/2);
    let min = 1;
    let max = shownNbr;
    if(nbrPages > shownNbr){
        if(page >= haflShownNbr){
            if(page > (nbrPages-haflShownNbr)){
                min = nbrPages - shownNbr + 1
                max = nbrPages
            }else{
                min = page - (haflShownNbr - 1)
                max = page + (shownNbr/2)
            }  
        }
    }else{
        max = nbrPages
    }
    
    for(let index = min; index <= max; index++){
        listPages[index] = index;
    }
   
    return(
        <div className="row">
            <div className="col-sm-12 col-md-5">
                <div className="dataTables_info" id="example1_info" role="status" aria-live="polite">
                    Affichage de <b>[{page === 1 ? page : (size*(page-1))}</b> à <b>{page === nbrPages ? (total) : ((page*size)-1)}]</b> lignes sur un total de <b>{total}</b>
                </div>
            </div>
            <div className="col-sm-12 col-md-7">
                <div className="dataTables_paginate paging_simple_numbers" id="example1_paginate">
                    <ul className="pagination" style={{"justifyContent" :"flex-end"}}>
                        <li className="paginate_button page-item" id="example1_first">
                            <button onClick={()=> loadPages(1, total, size, setObject, url)} className="page-link" href="#">&lsaquo;</button>
                        </li>
                        <li className="paginate_button page-item previous" id="example1_previous">
                            <button onClick={()=> loadPages(page-1, total, size, setObject, url)} className="page-link" href="#">&laquo;</button>
                        </li>
                        {
                        listPages.map(pagination =>{
                            return(
                                <li key={pagination} className={`paginate_button page-item ${pagination === page ? 'active' : ''}`}>
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            loadPages(pagination, total, size, setObject, url)
                                        }}
                                        data-dt-idx={pagination} 
                                        className="page-link" href="#">{pagination}
                                    </button>
                                </li>
                            )
                        })
                    }
                        <li className="paginate_button page-item next" id="example1_next">
                            <button onClick={()=> loadPages(page+1, total, size, setObject, url)} className="page-link" href="#">&raquo;</button>
                        </li>
                        <li className="paginate_button page-item" id="example1_last">
                            <button onClick={()=> loadPages(nbrPages, total, size, setObject, url)} className="page-link" href="#">&rsaquo;</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Pagination;