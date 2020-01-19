export const disableButton = (id) => {
    return document.getElementById(id).setAttribute('disabled', 'true')
}

export const enableButton = (id) => {
    return document.getElementById(id).removeAttribute('disabled')
}