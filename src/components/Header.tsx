// import { useCallback, useEffect, useState } from "react";
import logo from '../assets/images/logo.png';
import Image from 'next/image'
const Header = ()=>{
    return (
        <>
        {/* header main */}
        <header id="headerMain" className="header-main">
        <nav className="navbar-main">
          <div className="container-fluid header_navbar">
            <a href="index.html" className="navbar-brand">
              <Image
                src={logo}
                alt="Join Pool Party"
                width={100}
                height={60}
                className="img-fluid"
              />
            </a>
            <button type="button" id="menuBtn" className="navbar-menu-btn">
              <svg
                width={25}
                height={20}
                viewBox="0 0 25 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.29415 4.00586H23.5799C24.0533 4.00586 24.437 3.6561 24.437 3.22461V1.27148C24.437 0.83999 24.0533 0.490234 23.5799 0.490234H1.29415C0.820744 0.490234 0.437012 0.83999 0.437012 1.27148V3.22461C0.437012 3.6561 0.820744 4.00586 1.29415 4.00586ZM1.29415 11.8184H23.5799C24.0533 11.8184 24.437 11.4686 24.437 11.0371V9.08398C24.437 8.65249 24.0533 8.30273 23.5799 8.30273H1.29415C0.820744 8.30273 0.437012 8.65249 0.437012 9.08398V11.0371C0.437012 11.4686 0.820744 11.8184 1.29415 11.8184ZM1.29415 19.6309H23.5799C24.0533 19.6309 24.437 19.2811 24.437 18.8496V16.8965C24.437 16.465 24.0533 16.1152 23.5799 16.1152H1.29415C0.820744 16.1152 0.437012 16.465 0.437012 16.8965V18.8496C0.437012 19.2811 0.820744 19.6309 1.29415 19.6309Z"
                  fill="#110802"
                />
              </svg>
            </button>
            <ul className="menu reboot-list">
              <li className="menu__item">
                <a href="#" className="menu__item-link">
                  How it works
                </a>
              </li>
              <li className="menu__item">
                <a href="#" className="menu__item-link">
                  Docs
                </a>
              </li>
              <li className="menu__item">
                <a href="https://discord.gg/Q4VY5nCaBQ" className="menu__item-link">
                  Community
                </a>
              </li>
              <li className="menu__item">
                <a className="menu__item-link btn btn-primary btn-press" href={`https://app.joinpoolparty.io`}>
                  Join the Party!
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <nav id="navbarMobile" className="navbar-mobile navbar-dark">
          <div className="container-fluid">
            <div className="navbar-top">
              <a href="./index.html" className="navbar-brand">
                <Image
                  src={logo}
                  alt="Join Pool Party"
                  width={100}
                  height={60}
                  className="img-fluid"
                />
              </a>
              <button
                type="button"
                id="menuBtnClose"
                className="navbar-menu-btn close-btn"
              >
                <svg
                  width={18}
                  height={33}
                  viewBox="0 0 18 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.9586 16.25L16.6493 11.5592C17.225 10.9836 17.225 10.0503 16.6493 9.47422L15.6068 8.43172C15.0312 7.85609 14.0979 7.85609 13.5218 8.43172L8.83105 13.1225L4.14027 8.43172C3.56465 7.85609 2.63137 7.85609 2.05527 8.43172L1.01277 9.47422C0.437148 10.0498 0.437148 10.9831 1.01277 11.5592L5.70355 16.25L1.01277 20.9408C0.437148 21.5164 0.437148 22.4497 1.01277 23.0258L2.05527 24.0683C2.6309 24.6439 3.56465 24.6439 4.14027 24.0683L8.83105 19.3775L13.5218 24.0683C14.0975 24.6439 15.0312 24.6439 15.6068 24.0683L16.6493 23.0258C17.225 22.4502 17.225 21.5169 16.6493 20.9408L11.9586 16.25Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
            <ul className="menu reboot-list">
              <li className="menu__item">
                <a href="#" className="menu__item-link">
                  Start
                </a>
              </li>
              <li className="menu__item">
                <a href="#" className="menu__item-link">
                  Deposit
                </a>
              </li>
              <li className="menu__item">
                <a href="#" className="menu__item-link">
                  Prizes
                </a>
              </li>
              <li className="menu__item">
                <a href="#" className="menu__item-link">
                  Account
                </a>
              </li>
              <li className="menu__item">
                <a href="#" className="menu__item-link">
                  How it works
                </a>
              </li>
              <li className="menu__item">
                <a href="#" className="menu__item-link">
                  Docs
                </a>
              </li>
              <li className="menu__item">
                <a href="#" className="menu__item-link">
                  Community
                </a>
              </li>
            </ul>
            <ul className="social-media-list reboot-list">
              <li className="social-media__item">
                <a href="#" className="sodial-media__item-link">
                  <svg
                    width={43}
                    height={48}
                    viewBox="0 0 43 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M28.4451 22.8C28.4451 24.264 27.3651 25.464 25.9971 25.464C24.6531 25.464 23.5491 24.264 23.5491 22.8C23.5491 21.336 24.6291 20.136 25.9971 20.136C27.3651 20.136 28.4451 21.336 28.4451 22.8ZM17.2371 20.136C15.8691 20.136 14.7891 21.336 14.7891 22.8C14.7891 24.264 15.8931 25.464 17.2371 25.464C18.6051 25.464 19.6851 24.264 19.6851 22.8C19.7091 21.336 18.6051 20.136 17.2371 20.136ZM42.5811 4.944V48C36.5347 42.6568 38.4684 44.4255 31.4451 37.896L32.7171 42.336H5.50106C2.78905 42.336 0.581055 40.128 0.581055 37.392V4.944C0.581055 2.208 2.78905 0 5.50106 0H37.6611C40.3731 0 42.5811 2.208 42.5811 4.944ZM35.7411 27.696C35.7411 19.968 32.2851 13.704 32.2851 13.704C28.8291 11.112 25.5411 11.184 25.5411 11.184L25.2051 11.568C29.2851 12.816 31.1811 14.616 31.1811 14.616C25.48 11.4914 18.7832 11.4908 13.2531 13.92C12.3651 14.328 11.8371 14.616 11.8371 14.616C11.8371 14.616 13.8291 12.72 18.1491 11.472L17.9091 11.184C17.9091 11.184 14.6211 11.112 11.1651 13.704C11.1651 13.704 7.70906 19.968 7.70906 27.696C7.70906 27.696 9.72506 31.176 15.0291 31.344C15.0291 31.344 15.9171 30.264 16.6371 29.352C13.5891 28.44 12.4371 26.52 12.4371 26.52C12.7901 26.7671 13.3723 27.0875 13.4211 27.12C17.472 29.3886 23.2262 30.1318 28.3971 27.96C29.2371 27.648 30.1731 27.192 31.1571 26.544C31.1571 26.544 29.9571 28.512 26.8131 29.4C27.5331 30.312 28.3971 31.344 28.3971 31.344C33.7011 31.176 35.7411 27.696 35.7411 27.696Z"
                      fill="#3E09B2"
                    />
                  </svg>
                </a>
              </li>
              <li className="social-media__item">
                <a href="#" className="sodial-media__item-link">
                  <svg
                    width={49}
                    height={40}
                    viewBox="0 0 49 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M43.647 10.2235C43.6775 10.6499 43.6775 11.0763 43.6775 11.5027C43.6775 24.5077 33.7791 39.4925 15.6876 39.4925C10.114 39.4925 4.9364 37.8783 0.581055 35.0763C1.37296 35.1677 2.1343 35.1981 2.95668 35.1981C7.55559 35.1981 11.7891 33.6449 15.1699 30.9951C10.845 30.9037 7.22062 28.0713 5.97187 24.1728C6.58106 24.2641 7.19015 24.325 7.82981 24.325C8.71302 24.325 9.59634 24.2031 10.4186 23.99C5.91102 23.0763 2.53021 19.1169 2.53021 14.3352V14.2134C3.8398 14.9444 5.36277 15.4012 6.97687 15.4621C4.32712 13.6955 2.59115 10.6803 2.59115 7.26916C2.59115 5.44178 3.07837 3.76666 3.93121 2.30472C8.77387 8.27425 16.0531 12.1727 24.2154 12.5991C24.0632 11.8682 23.9718 11.1068 23.9718 10.3454C23.9718 4.924 28.3576 0.507812 33.8093 0.507812C36.6418 0.507812 39.2002 1.69563 40.9972 3.61441C43.2204 3.18803 45.3524 2.36566 47.2408 1.23878C46.5097 3.52309 44.9565 5.44188 42.9159 6.66006C44.8957 6.44697 46.8144 5.89863 48.5809 5.13728C47.241 7.08644 45.5658 8.82241 43.647 10.2235Z"
                      fill="#3E09B2"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      {/* !header main */}
      </>
    )
};

export default Header;