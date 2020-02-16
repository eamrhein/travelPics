import styled from 'styled-components';
const theme = {
	colors: {
		navbar: '#FFFFFF',
		background: '#EFEFEF',
		font: '#545454',
		primary: '#FF3B3F',
		secondary: '#CAEBF2',
	},
};
const Container = styled.div`
    display: flex;
    justify-content: center;
    height: 100%;
    @media(max-width: 900px) {
        flex-direction: column;
    }
`;
const Main = styled.div`
    width: 700px;
    padding: 1vh;
    margin: 5vh 0vw 5vh 10vw;
    overflow-y: scroll;
    ::-webkit-scrollbar {
    width: 0px;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
    }
    @media(max-width: 900px) {
        max-height: 700px;
        height: 70vh;
        width: 90vw;
        margin: 0;
    }
`;
const SideBar = styled.div`
    width: 250px;
    padding: 1vh;
    margin: 5vh 10vw 5vh 1vw;
    overflow-y: scroll;
    ::-webkit-scrollbar {
    width: 0px;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
    }
    .user {
        display: flex;
        align-items: center;
        margin-bottom: 1vh;
    }
    .friends {
        background-color: #fff;
        height: 50vh;
        display: flex;
        justify-content: center;
        padding-top: 5px;
    }
    @media(max-width: 900px) {
        padding: 0;
        margin: 0;
        width: 100%;
        height: 20vh;
        .user,
        .user >div,
        .user > div > * {
            display: none;
        }
        .friends {
            height: 15vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: ${props => props.theme.colors.background} ;
        }
    }
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.785, 0.135, 0.15, 0.86);
`;

const Input = styled.input`
    margin-bottom: 1rem;
    width: 300px;
    height: 35px;
    border: 0;
    padding:15px;
    color: #000;
`;

const Button = styled.button`
    border: 0;
    height: 35px;
    text-decoration: none;
    font-family: sans-serif;
    font-size: 1rem;
    cursor: pointer;
    text-align: center;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-color: ${props => props.theme.colors.font};
    color: #fff;
    border-radius: 3px;
    transition: background 250ms ease-in-out, 
                transform 150ms ease;
    &:hover{
        background-color:${props => props.theme.colors.primary};
    }
`;

// Text

const Title = styled.h1`
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  color: ${props => props.theme.colors.font};
  font-size: calc(18pt + 0.5rem);
`;

const Title2 = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  color: ${props => props.theme.colors.font};
  font-size: calc(14pt + 1rem);
`;

const Text = styled.p`
  font-family: 'Nunito', sans-serif;
  color: ${props => props.theme.color.colors.font || '#4d4d4d'};
`;

const Nav = styled.nav`    
    background-color: ${(props) => props.theme.colors.navbar};
    border-bottom: 1px solid lightgrey;
    @media(max-width: 900px) {
        display: block;
    }
    /* box-shadow: 0px 1px 15px rgba(0,0,0,0.15); */
`;
const NavItems = styled.ul`
    display: flex;
    width: 100vw;
    height: 3vh;
    align-items: center;
    li {
        margin-right: 1.5rem;
        list-style: none;
        opacity: 0.5;
        transition: all 0.2s ease;
    }
    li:hover {
        opacity: 1;
    }
    @media(max-width: 900px) {
        height: 100%;
        padding-inline-start: 0;
        flex-direction: column;
        justify-content: flex-start;
        .logo, li {
            margin-right: 0 !important;
            padding: 0;
        }
        li {
            margin-right: none;
        }
    }
    .logo {
        margin-right: auto;
        opacity: 1;
    }
  
`;
// img 
const Img = styled.img`
    max-width:100%;
    max-height:100%;
`;

const Video = styled.video`
    max-width:100%;
    max-height:100%;
`;
//Trip
const Avatar = styled.div`
    height: 40px;
`;
const Trip = styled.div`
    border: 1px solid lightgrey;
    display: flex;
    flex-flow: column;
    background-color: #fff;
    margin-bottom: 5vh;
    @media(max-width: 900px) {
        margin-bottom: 5vh;
    }
`;
const TripTitle = styled.div`
    margin: 5px 10px 5px 10px;
    padding: 0;
    height: 45px;
    display: flex;
    flex-direction: row;
    align-items: center;
    div {
        margin-left: 10px;
    }
    .title {
        font-family: 'Roboto';
        font-weight: bolder;
        font-size: 20pt;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        left: -5vw;
    }
    

`;
const SmallImg =styled.div `
    min-height: 80px;
    min-width: 80px;
    height: 150px;
    margin-bottom: 1rem;
    object-fit: cover; 
`; 

const TripImg = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 1000px;
    margin-bottom: 30px;
    object-fit: cover;
`;

const TripComments = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
export {SmallImg, Form, FormWrapper, Button, Input, Nav, NavItems, Title, Title2, Text, Main, Container, SideBar, Trip, TripTitle,TripImg, Avatar, Img, Video, TripComments, theme};