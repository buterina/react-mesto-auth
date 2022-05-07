import React from 'react';
import { Route, Switch, Redirect, useHistory, Link } from 'react-router-dom';
import * as auth from '../auth.js';
import '../index.css';
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithConfirmation from './PopupWithConfirmation';
import { api } from '../utils/Api';
import ProtectedRoute from './ProtectedRoute';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoTooltip';

function App() {

  const history = useHistory();

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({}); //use for email in the menu


  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState({
    isOpen: false,
    isSuccess: false
  });


  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [cardToBeDeleted, setCardToBeDeleted] = React.useState('');

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      history.push("/");
      return;
    }

    history.push('/sign-in');
  }, [loggedIn]);




  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getProfile(), api.getInitialCards()])
        .then(([profileData, cardsData]) => {
          setCurrentUser(profileData)
          setCards(cardsData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [])

  const tokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt');
      return auth
        .getContent(jwt)
        .then((data) => {
          if (data) {
            setUserData({
              password: data.password,
              email: data.email
            });
            setLoggedIn(true);

          }
        })
    }
  }

  const handleRegister = (password, email) => {
    return auth
      .register(password, email)
      .then(() => {
        setIsInfoTooltipPopupOpen({
          isOpen: true,
          isSuccess: true
        });
        history.push("/sign-in");
      })
      .catch((err) => {
        setIsInfoTooltipPopupOpen({
          isOpen: true,
          isSuccess: false
        })
      })
  }


  const handleLogin = (password, email) => {
    return auth
      .authorize(password, email)
      .then((res) => {

        localStorage.setItem('jwt', res.jwt);
        tokenCheck();
        setLoggedIn(true);

        history.push("/")


      })
      .catch((err) => {
        setIsInfoTooltipPopupOpen({
          isOpen: true,
          isSuccess: false
        });
      });
  }

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setUserData({});
    setLoggedIn(false);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);


    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleCardDelete = () => {

    api.deleteCard(cardToBeDeleted._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardToBeDeleted._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleConfirmCardDelete = (card) => {
    setIsConfirmationPopupOpen(true);
    setCardToBeDeleted(card)

  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({ name: '', link: '' });
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  const handleUpdateUser = ({ name, about }) => {
    api.editProfile(name, about)
      .then((profileData) => {
        setCurrentUser(profileData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });

  }

  const handleUpdateAvatar = ({ avatar }) => {
    api.updateAvatar(avatar)
      .then((avatarData) => {
        setCurrentUser(avatarData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleUpdatePlace = ({ name, link }) => {
    api.addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider
      value={currentUser}>

      <div className="page">
        <div className="page__content">
          <Header>
            <Route path='/' exact>
              <p className='header__nav-link' >{userData.email}</p>
              <Link to='/sign-in' className='header__nav-link header__nav-link_type_exit' onClick={handleSignOut}>Выйти</Link>
            </Route>
            <Route path='/sign-up'>
              <Link to='/sign-in' className='header__nav-link'>Войти</Link>
            </Route>
            <Route path='/sign-in'>
              <Link to='/sign-up'
                className='header__nav-link'>Регистрация</Link>
            </Route>
          </Header>

          <Switch>
            <ProtectedRoute path='/' exact loggedIn={loggedIn}>
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleConfirmCardDelete}
                cards={cards}
              />
              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
                buttonText="Сохранить"
                title="Редактировать профиль"
              />

              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
                buttonText="Сохранить"
                title="Обновить аватар"
              />

              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleUpdatePlace}
                buttonText="Добавить"
                title="Новое место"
              />

              <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
              />

              <PopupWithConfirmation

                name="delete-confirm"
                isOpen={isConfirmationPopupOpen}
                title="Вы уверены?"
                buttonText="Да"
                onClose={closeAllPopups}
                onSubmit={handleCardDelete}
              />
            </ProtectedRoute>
            <Route path="/sign-in">
              <Login onLogin={handleLogin} tokenCheck={tokenCheck} />

            </Route>

            <Route path="/sign-up" >
              <Register onRegister={handleRegister} />

            </Route>

            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>


          </Switch>
          <InfoToolTip
            isOpen={isInfoTooltipPopupOpen.isOpen}
            onClose={closeAllPopups}
            isSuccess={isInfoTooltipPopupOpen.isSuccess} />
          <Footer />

        </div>
      </div>

    </CurrentUserContext.Provider>
  );

}

export default App;


