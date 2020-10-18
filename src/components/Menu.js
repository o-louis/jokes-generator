import React from 'react'

const Menu = ({ categories, selectSection }) => {

    const highlighted = (category, index) => {
        const element = document.querySelectorAll('li');
        element.forEach(item => item.className = "")
        element[index].className = "selected";
        selectSection(category);
    }

    const menuItems = categories.map((category, index) => (
        <li 
            key={index}
            className={category === 'random' ? 'selected' : ''}
            onClick={() => highlighted(category, index)}>
            {category}
        </li>
    ))

    return (
        <aside>
            <ul>{menuItems}</ul>
        </aside>
    )
}

export default Menu
