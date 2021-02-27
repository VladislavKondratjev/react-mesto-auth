class Api {
    constructor({ address, token }) {
        this._address = address;
        this._token = token;
    }

    _apiAnswer(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        return fetch(`${this._address}/cards`, {
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => this._apiAnswer(res))
    }

    getUserData() {
        return fetch(`${this._address}/users/me`, {
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => this._apiAnswer(res))
    }

    updateUserInfo(data) {
        return fetch(`${this._address}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then((res) => this._apiAnswer(res))
    }

    updateAvatar(data) {
        return fetch(`${this._address}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then((res) => this._apiAnswer(res))
    }

    postCard(data) {
        return fetch(`${this._address}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then((res) => this._apiAnswer(res))
    }

    deletetCard(id) {
        return fetch(`${this._address}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => this._apiAnswer(res))
    }

    putLike(id) {
        return fetch(`${this._address}/cards/likes/${id}`, {
            method: 'PUT',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
        })
            .then((res) => this._apiAnswer(res))
    }

    deleteLike(id) {
        return fetch(`${this._address}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => this._apiAnswer(res))
    }

    changeLikeCardStatus(id, state) {
        return state ? this.putLike(id) : this.deleteLike(id)
    }

}

export const api = new Api({
    address: 'https://mesto.nomoreparties.co/v1/cohort-19',
    token: 'cabe1d76-a428-4aaa-846e-7d735d853b84'
})