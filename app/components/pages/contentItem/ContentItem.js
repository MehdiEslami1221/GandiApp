import InfiniteScroll from "react-infinite-scroll-component";
import Item from "./Item";
import React from "react";

const ContentItem=({items})=>{
    return (
        <div className="py-2">
            <InfiniteScroll
                dataLength={items.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<span/>}
                endMessage={<span/>}>

                <div className="container overflow-hidden">


                    <div className="row row-cols-2 row-cols-lg-4 g-2 g-lg-3">


                        {items.map((item, index) => (
                            <div key={index}>

                                <Item item={item}/>

                            </div>
                        ))}

                    </div>

                </div>
            </InfiniteScroll>


        </div>
    )
}
export default ContentItem