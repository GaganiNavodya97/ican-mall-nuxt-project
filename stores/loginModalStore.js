import { defineStore } from 'pinia'

const store = {
    state: () => ({ 
        loginModal: false,
        index:"",
        downloadModal:false
    }),
    getters: {
        checkLoginModal(){
            return this.loginModal;
        },
        checkdownloadModal(){
           return this.downloadModal;
        }
    },
    actions: {
        toggleLoginModal(){
            this.loginModal = !this.loginModal;
        },
        setPhoneCodeIndex(index){
            this.index = index
        },
        toggleDownloadModal(){
            this.downloadModal =!this.downloadMoadl;
            console.log(this.downloadModal, 'modal open');
        }
    }
};

export const useLoginModalStore = defineStore("loginModalStore",store);
