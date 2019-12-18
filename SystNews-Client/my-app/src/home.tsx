import * as React from 'react';
import './App.css';

import {
    BrowserRouter as Router,
    Route,
    Link,
    RouteComponentProps
} 
    // @ts-ignore
    from "react-router-dom";

import { Context } from './State';

export default function Home() {
    // @ts-ignore
    const { articles, onArticlesChange } = React.useContext(Context);
    React.useEffect(() => {

        fetch('http://localhost:3001/article', {
            method: 'GET',
            headers: {
                'Content-Type': "application/json; charset=utf-8"
            }
        }).then(res => res.json())
            .then((res) => {
                const articlesTemp: any = [];

                res.map((res: any) => {
                    articlesTemp.unshift(res);
                })

                onArticlesChange(articlesTemp);
            }
            )
            .catch(error => console.error('Error:', error));
    }, [])

    return (
        <React.Fragment>
            <div className="App">
                <div className="grid-container">
                    <div className="header">
                        <div className="headergridV">
                            <div className="logo">
                                <Link to="/">
                                    <h3 className="logo">Syst News</h3>
                                </Link>
                            </div>
                            <div className="headerEmpty">
                                <br></br>
                            </div>
                            <div className="headergridH">
                                <div id="slope">
                                    <br></br>
                                </div>
                                <NavBarButton idAlt="newsfeed" nameAlt={"Home"} category={0} />
                                <NavBarButton idAlt="internationalNews" nameAlt={"International News"} category={1} />
                                <NavBarButton idAlt="localNews" nameAlt={"Local News"} category={2} />
                                <NavBarButton idAlt="technology" nameAlt={"Technology"} category={3} />
                                <NavBarButton idAlt="economy" nameAlt={"Economy"} category={4} />
                                <Link to="/publish" >
                                    <div id="publish" className="navbarElement">
                                        <p>Publish</p>
                                    </div>
                                </Link>
                                <div id="emptySpaceH"><p>Empty</p></div>
                            </div>
                        </div>
                        <div id="scrollBar" className="scroll-left">
                            <ScrollBarPreview articles={articles} indexx={0} />
                        </div>
                    </div>
                    <div className="articleView">
                        <ArticleViewRenderer article={articles} id={parseInt(window.location.href.split("/")[window.location.href.split("/").length - 1])} />
                    </div>
                    {articleCounter1 = 0}
                    {articleCounter2 = 0}
                    {articleCounter3 = 0}
                    <div className="articlesCol1">
                        <div>
                            <ArticlePreviewRenderer1 articleList1={articles} />
                        </div>
                    </div>
                    <div className="articlesCol2">
                        <div>
                            <ArticlePreviewRenderer2 articleList2={articles} />
                        </div>
                    </div>
                    <div className="articlesCol3">
                        <div>
                            <ArticlePreviewRenderer3 articleList3={articles} />
                        </div>
                    </div>
                    <div className="categoryCol1">
                        <div>
                            <CategoryPreviewRenderer article={articles} col={1} />
                        </div>
                    </div>
                    <div className="categoryCol2">
                        <CategoryPreviewRenderer article={articles} col={2} />
                    </div>
                    <div className="categoryCol3">
                        <CategoryPreviewRenderer article={articles} col={3} />
                    </div>
                    <div className="footer">
                        <p>
                            Mini-project: website for a newspaper
                            <br></br><br></br>
                            Made by Alexander Carlsen
                            <br></br><br></br>
                            For TDAT2003 Systemutvikling2
                        </p>
                    </div>
                </div>
            </div>
        </React.Fragment>

    )
}

const ArticlePreviewRenderer1 = (props: { articleList1: any }) => (
    props.articleList1.map((articleList1: { id: any; category: string; rating: string; title: React.ReactNode; img: string | undefined; alttext: any }) => {
        const category = parseInt(window.location.href.split("/")[3], 10);
        console.log("col1 category: " + category);
        if (category != 1 && category != 2 && category != 3 && category != 4) {

            if (articleCounter1 == 3) { articleCounter1 = 0; }
            articleCounter1++;

            if (window.location.href.split("/").length == 4) {
                if (articleCounter1 == 1) {

                    return (
                        <div id={articleList1.id} className="articlePreview" key={articleList1.id} >
                            {/* 
                            // @ts-ignore */}
                            <Link to={"/" + articleList1.category + "/" + articleList1.rating + "/" + articleList1.id} onClick={articleClicked(articleList1, articleList1.id)}>
                                <div className="article">
                                    <div className="title">
                                        <p className="nfArticleTitle">{articleList1.title}</p>
                                        {/* 
                                        // @ts-ignore */}
                                        <ArticlePreviewUnderTitleRenderer articleUT={articleList1} />
                                    </div>
                                    <div className="img">
                                        <img src={articleList1.img} alt={articleList1.alttext} width="100%" height="100%"></img>
                                    </div>
                                </div>
                            </Link>
                            <br></br>
                        </div>
                    )
                }
            }
        }
    })
);

const ArticlePreviewRenderer2 = (props: { articleList2: any }) => (
    props.articleList2.map((articleList2: { id: any; category: string; rating: string; title: React.ReactNode; img: string | undefined; alttext: any }) => {
        const category = parseInt(window.location.href.split("/")[3], 10);
        if (category != 1 && category != 2 && category != 3 && category != 4) {

            if (articleCounter2 == 3) { articleCounter2 = 0; }
            articleCounter2++;


            if (window.location.href.split("/").length == 4) {
                if (articleCounter2 == 2) {

                    return (
                        <div id={articleList2.id} className="articlePreview2" key={articleList2.id}>
                            {/* 
                            // @ts-ignore */}
                            <Link to={"/" + articleList2.category + "/" + articleList2.rating + "/" + articleList2.id} onClick={articleClicked(articleList2, articleList2.id)}>
                                <div className="article">
                                    <div className="title">
                                        <p className="nfArticleTitle">{articleList2.title}</p>
                                        {/* 
                                        // @ts-ignore */}
                                        <ArticlePreviewUnderTitleRenderer articleUT={articleList2} />
                                    </div>
                                    <div className="img">
                                        <img src={articleList2.img} alt={articleList2.alttext} width="100%" height="100%"></img>
                                    </div>
                                </div>
                            </Link>
                            <br></br>
                        </div>
                    )
                }
            }
        }
    })
);

const ArticlePreviewRenderer3 = (props: { articleList3: any }) => (
    props.articleList3.map((articleList3: { id: any; category: string; rating: string; title: React.ReactNode; img: string | undefined; alttext: any }) => {
        const category = parseInt(window.location.href.split("/")[3], 10);
        if (category != 1 && category != 2 && category != 3 && category != 4) {

            if (articleCounter3 == 3) { articleCounter3 = 0; }
            articleCounter3++;


            if (window.location.href.split("/").length == 4) {
                if (articleCounter3 == 3) {
                    return (
                        <div id={articleList3.id} className="articlePreview3" key={articleList3.id}>
                            {/* 
                            // @ts-ignore */}
                            <Link to={"/" + articleList3.category + "/" + articleList3.rating + "/" + articleList3.id} onClick={articleClicked(articleList3, articleList3.id)}>
                                <div className="article">
                                    <div className="title">
                                        <p className="nfArticleTitle">{articleList3.title}</p>
                                        {/* 
                                        // @ts-ignore */}
                                        <ArticlePreviewUnderTitleRenderer articleUT={articleList3} />
                                    </div>
                                    <div className="img">
                                        <img src={articleList3.img} alt={articleList3.alttext} width="100%" height="100%"></img>
                                    </div>
                                </div>
                            </Link>
                            <br></br>
                        </div>
                    )
                }
            }
        }
    })
);

const CategoryPreviewRenderer = (props: { article: any, col: number }) => (
    props.article.map((article: { category: React.ReactText; id: any; rating: string; title: React.ReactNode; img: string | undefined; alttext: any }) => {
        const category = parseInt(window.location.href.split("/")[3], 10);
        if (category == 1 || category == 2 || category == 3 || category == 4) {
            if (article.category == category && article.id != parseInt(window.location.href.split("/")[6], 10)) {

                console.log("time to swish through");
                if (articleCategoryCounter1 == 3) { articleCategoryCounter1 = 0; }
                articleCategoryCounter1++;

                if (articleCategoryCounter1 == props.col) {
                    console.log("lets print this one: " + article.id + "at col: " + props.col);
                    return (
                        <div id={article.id} className="articlePreview3" key={article.id}>
                            {/* 
                            // @ts-ignore */}
                            <Link to={"/" + article.category + "/" + article.rating + "/" + article.id} onClick={articleClicked(article, article.id)}>
                                <div className="article">
                                    <div className="title">
                                        <p className="nfArticleTitle">{article.title}</p>
                                        {/* 
                                        // @ts-ignore */}
                                        <ArticlePreviewUnderTitleRenderer articleUT={article} />
                                    </div>
                                    <div className="img">
                                        <img src={article.img} alt={article.alttext} width="100%" height="100%"></img>
                                    </div>
                                </div>
                            </Link>
                            <br></br>
                        </div>
                    )
                }
                else {
                    return (null)
                }
            }
        }
    })
)

interface ArticlePreviewUnderTitleRenderer {
    articleUT: any;
}

const ArticlePreviewUnderTitleRenderer = (props: { articleUT: any }) => {
    // @ts-ignore
    if (props.articleUT.category == 1) {
        return (
            <React.Fragment>
                <p className="nfUnderTitle">{"International News - " + props.articleUT.date}</p>
            </React.Fragment>
        )
    }
    // @ts-ignore
    else if (props.articleUT.category == 2) {
        return (
            <React.Fragment>
                <p className="nfUnderTitle">{"Local News - " + props.articleUT.date}</p>
            </React.Fragment>
        )
    }
    // @ts-ignore
    else if (props.articleUT.category == 3) {
        return (
            <React.Fragment>
                <p className="nfUnderTitle">{"Technology - " + props.articleUT.date}</p>
            </React.Fragment>
        )
    }
    // @ts-ignore
    else if (props.articleUT.category == 4) {
        return (
            <React.Fragment>
                <p className="nfUnderTitle">{"Economy - " + props.articleUT.date}</p>
            </React.Fragment>
        )
    }
}

const ArticleViewRenderer = (props: { article: any, id: number }) => (
    props.article.map((article: { id: number; title: React.ReactNode; img: string | undefined; author: string; date: React.ReactNode; ingress: React.ReactNode; content: React.ReactNode; alttext: any }) => {
        //console.log(window.location.href.split("/").length);
        if (article.id == props.id && window.location.href.split("/").length >= 5) {
            return (<div className="article-grid-container-art1">
                <div className="titleA">
                    <h3>{article.title}</h3>
                </div>
                <div className="mainImage">
                    <img src={article.img} alt={article.alttext} width="auto%" height="440" ></img>
                </div>
                <div className="author">
                    {"Written by: " + article.author}
                </div>
                <div className="time">
                    {article.date}
                </div>
                <div className="deleteButton">
                    {/* 
                // @ts-ignore */}
                    <button id="deleteArticleButton" className="navbarElement" onClick={deleteClicked(article.id)}>Delete Article</button>
                </div>
                <div className="ingres">
                    <p>
                        {article.ingress}
                    </p>
                </div>
                <div className="text">
                    <p>
                        {article.content}
                    </p>
                </div>
                <div className="underText">
                    <br></br>
                    {/* 
                    // @ts-ignore */}
                    <ArticleUnderTextRenderer />
                </div>
            </div>
            )
        }
    })
)

interface ArticleUnderTextRenderer {

}

const ArticleUnderTextRenderer = () => {
    if (window.location.href.split("/").length >= 4) {
        const category: number = parseInt(window.location.href.split("/")[window.location.href.split("/").length - 3]);
        if (category == 1) {
            return (<p id="articleUnderText">{"More International News Articles:"}</p>)
        }
        else if (category == 2) {
            return (<p id="articleUnderText">{"More Local News Articles:"}</p>)
        }
        else if (category == 3) {
            return (<p id="articleUnderText">{"More Technology Articles:"}</p>)
        }
        else if (category == 4) {
            return (<p id="articleUnderText">{"More Economy Articles:"}</p>)
        }
    }
    else {
        return (<div></div>)
    }
}

const NavBarButton = (props: { idAlt: string, nameAlt: string, category: number }) => {
    const adress: number = parseInt(window.location.href.split("/")[3], 10);

    if (adress != 1 && adress != 2 && adress != 3 && adress != 4 && props.category == 0) {
        return (
            // @ts-ignore
            <Link to={"/"} id={props.idAlt} className="navbarElementSelected">
                <p>{props.nameAlt}</p>
            </Link>
        )
    }
    else if (adress == props.category && props.category > 0) {
        return (
            // @ts-ignore
            <Link to={"/" + props.category} id={props.idAlt} className="navbarElementSelected">
                <p>{props.nameAlt}</p>
            </Link>
        )
    }
    else if (props.category == 0) {
        return (
            // @ts-ignore
            <Link to={"/"} id={props.idAlt} className="navbarElement">
                <p>{props.nameAlt}</p>
            </Link>
        )
    }
    else {
        return (
            // @ts-ignore
            <Link to={"/" + props.category} id={props.idAlt} className="navbarElement">
                <p>{props.nameAlt}</p>
            </Link>
        )
    }
}

const ScrollBarPreview = (props: { articles: any, indexx: number }) => (
    props.articles.map((articles: any, index: number) => {
        if (index == props.indexx) {
            return (
                // @ts-ignore
                <Link to={"/" + articles.category + "/" + articles.rating + "/" + articles.id} onClick={articleClicked(articles, articles.id)}>
                    <p className="scrollBarPreviewText">{" " + articles.title + " - " + articles.date + " "}</p>
                </Link>
            )
        }
    })
)

function articleClicked(article: any, id: number) {
    window.scrollTo(0, 0);
}

// @ts-ignore
const deleteClicked = (idDel) => event => {

    if (window.confirm("Are you sure you want to delete?")) {
        // @ts-ignore
        window.location.replace("http://localhost:3000/");

        fetch('http://localhost:3001/article/' + idDel, {
            method: 'DELETE',
            headers: {
                'Content-Type': "application/json; charset=utf-8"
            }
        }).then(res => res.json())
    }

}

let articleShow = false;
let articleCounter1 = 0;
let articleCounter2 = 0;
let articleCounter3 = 0;
let articleCategoryCounter1 = 0;
let articleCategoryCounter2 = 0;
let articleCategoryCounter3 = 0;

export let articleList1 = [
    { id: 120314814, title: "test1", author: "janove", date: "2552", ingress: "wfe", content: "wer", category: 2, rating: 1 },
    { id: 638500984, title: "test2", }
];

export let articleList2 = [
    { id: 309485643, title: "test3", },
    { id: 230592255, title: "test4", }
];

export let articleList3 = [
    { id: 135473754, title: "test5", },
    { id: 203950253, title: "test6", }
];
