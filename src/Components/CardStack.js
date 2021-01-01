import React, {useState, useEffect} from 'react';
import {Card} from './Card'
import { Form } from './Form'


export const CardStack = () => {

    const [cards, setCards] = useState([])
    const [addCard, setAddCard] = useState('')
    const [codedText, setCodedText] = useState('')

    useEffect(()=>{
        fetch('/api').then(response => {
            if(response.ok){
                return response.json()
            }
        }).then(data => setCards(data))
    },[])

    const handleFormChange = (inputValue) => {
        setAddCard(inputValue)
    }

    const handleFormSubmit = () => {
        fetch('/api/create', {
            method: 'POST',
            body: JSON.stringify({
                content:addCard
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json())
          .then(message=> {
                console.log(message)
                setAddCard('')
                setCodedText(message['codedText'])
                updateCardStack()
        })
    }

    const updateCardStack = () => {
        fetch('/api').then(response =>{
            if(response.ok){
                return response.json()
            }
        }).then(data => setCards(data))
    }

    const handleCardClick = (cardContent) => {
        setAddCard(cardContent)
    }

    const handleCardDelete = (cardID) =>{
        fetch('/api/'+cardID, {
            method: 'POST',
            body: JSON.stringify({
                id: cardID
            })
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                updateCardStack()
        })
    }

    return (
        <div>
            <Form userInput={addCard} codedText={codedText} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit}/>
            <Card cards={cards} onCardClick={handleCardClick} onCardDelete={handleCardDelete}/>
        </div>
    )
}