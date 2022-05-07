import React from "react";
import PopupWithForm from "./PopupWithForm";

import successIcon from '../images/success-icon.svg';
import failIcon from '../images/fail-icon.svg';

const InfoToolTip = ({ onClose, isOpen, isSuccess }) => {
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}>
      <img
        className="infotooltip__icon"
        src={isSuccess ? successIcon : failIcon}
        alt={isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз'} />
      <h2 className="form__title form__title_type_infotooltip">{isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз'}</h2>

    </PopupWithForm>
  )
}

export default InfoToolTip;
