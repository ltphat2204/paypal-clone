/// <reference types="vite/client" />

import ("ethers").Eip1193Provider;

interface Window {
    ethereum: Eip1193Provider;
}