import React, { Component } from 'react';
import "./App.css";
// @ts-ignore
import { Link } from 'react-router-dom';

export default class publish extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="grid-containerP">
                    <div className="headerP">
                        <div className="headergridV">
                            <div className="logo">
                                <h3>Syst News</h3>
                            </div>
                            <div className="headerEmpty">
                                <br></br>
                            </div>
                            <div className="headergridH">
                                <div id="slope">
                                    <br></br>
                                </div>
                                <Link to="/" id="newsfeed" className="navbarElement">
                                    <p>Home</p>
                                </Link>
                                <Link to="/1" id="internationalNews" className="navbarElement">
                                    <p>International News</p>
                                </Link>
                                <Link to="/2" id="localNews" className="navbarElement">
                                    <p>Local News</p>
                                </Link>
                                <Link to="/3" id="technology" className="navbarElement">
                                    <p>Technology</p>
                                </Link>
                                <Link to="/4" id="economy" className="navbarElement">
                                    <p>Economy</p>
                                </Link>
                                <Link to="/publish" >
                                    <div id="publish" className="navbarElementSelected">
                                        <p>  Publish      </p>
                                    </div>
                                </Link>
                                <div id="emptySpaceH"><p>Empty</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="publishArea">
                        <h2>Write a new article</h2>
                        <div className="input">
                            <h4>Title:</h4>
                            <input id="Overskrift" type="text" size={110}></input>
                            <h4>Ingres:</h4>
                            {/*
                            // @ts-ignore */}
                            <textarea id="Ingress" type="text" cols={100} rows={5} wrap="hard"></textarea>
                        </div>
                        <div className="lower-meny">
                            <h4>Text:</h4>
                            {/*
                            // @ts-ignore */}
                            <textarea id="Hovedtekst" type="text" cols={100} rows={20} wrap="hard"></textarea>
                            <h4>Image: (Link to an image on the internet)</h4><input type="text" id="mainImage"></input> <br></br>
                            <h4>Image alternative text: (Text describing the image)</h4><input type="text" id="alttext"></input> <br></br>
                            <h4>Author:</h4><input type="text" id="author"></input> <br></br>
                            <div className="categoryP">
                                <h4>Category</h4>
                                <input id="catRad1" name="category" type="radio" value="1" />International News<br></br>
                                <input id="catRad2" name="category" type="radio" value="2" />Local News<br></br>
                                <input id="catRad3" name="category" type="radio" value="3" />Technology<br></br>
                                <input id="catRad4" name="category" type="radio" value="4" />Economy<br></br> <br></br>
                            </div>
                            <div className="importanceP">
                                <h4>Importance (1 is most important)</h4>
                                <input id="impRad1" name="importance" type="radio" value="1" />1<br></br>
                                <input id="impRad2" name="importance" type="radio" value="2" />2<br></br>
                                <input id="impRad3" name="importance" type="radio" value="3" />3<br></br>
                            </div>
                            <button id="submitArticleButton" className="navbarElement" onClick={submitArtikkel}>Publish Article</button>
                        </div>
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
            </React.Fragment>

        )
        function submitArtikkel() {

            console.log("Article submitted");
            // @ts-ignore
            let title = document.getElementById("Overskrift").value;
            // @ts-ignore
            let ingress = document.getElementById("Ingress").value;
            // @ts-ignore
            let content = document.getElementById("Hovedtekst").value;
            // @ts-ignore
            let imgSrc = document.getElementById("mainImage").value;
            // @ts-ignore
            let alttext = document.getElementById("alttext").value;
            // @ts-ignore
            let author = document.getElementById("author").value;
            let radios = document.getElementsByName("category");
            let impRadios = document.getElementsByName("importance");
            let today = new Date();
            let date = today.getFullYear() + '.' + (today.getMonth() + 1) + '.' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes();
            let category;
            let rating;
            for (let i = 0; i < radios.length; i++) {
                // @ts-ignore
                if (radios[i].checked) {
                    // @ts-ignore
                    category = radios[i].value;
                }
            }
            for (let j = 0; j < impRadios.length; j++) {
                // @ts-ignore
                if (impRadios[j].checked) {
                    // @ts-ignore
                    rating = impRadios[j].value;
                }
            }

            var errorMessage = "Error. You need to write something in the: "
            var dataCorrect = true;
            if (title == null || title == "") {
                dataCorrect = false;
                errorMessage += "title field, ";
            }
            if (ingress == null || ingress == "") {
                dataCorrect = false;
                errorMessage += "ingress field, ";
            }
            if (content == null || content == "") {
                dataCorrect = false;
                errorMessage += "text field, ";
            }
            if (imgSrc == null || imgSrc == "") {
                dataCorrect = false;
                errorMessage += "image link field, ";
            }
            if (alttext == null || alttext == "") {
                dataCorrect = false;
                errorMessage += "image description field, ";
            }
            if (category == null || category < 0 || category > 4) {
                dataCorrect = false;
                errorMessage += "category field, ";
            }
            if (rating == null || rating < 0 || rating > 3) {
                dataCorrect = false;
                errorMessage += "importance field, ";
            }
            errorMessage += ". You need to write something in these to be able to publish your article."

            if (dataCorrect) {
                if (window.confirm("Are you sure you want to publish?")) {
                    // @ts-ignore
                    window.location.replace("http://localhost:3000/");

                    const newArticle = { title: title, img: imgSrc, author: author, date: date, ingress: ingress, content: content, category: category, rating: rating, alttext: alttext };

                    fetch('http://localhost:3001/article', {
                        method: 'POST',
                        body: JSON.stringify(newArticle),
                        headers: {
                            'Content-Type': "application/json"
                        }
                    })
                        .catch(error => console.error('Errorx:', error));
                }
            }
            else {
                alert(errorMessage);
            }


        }
 
    }
}