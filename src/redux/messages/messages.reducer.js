export const SET_CONVOS = '[MESSAGES] SET_CONVOS'
export const SET_MESSAGE_SEARCH_RESULTS =
  '[MESSAGES] SET_MESSAGE_SEARCH_RESULTS'
export const SET_CURRENT_CONVOID = '[MESSAGES] SET_CURRENT_CONVOID'
export const SET_GALLERY_URLS = '[MESSAGES] SET_GALLERY_URLS'

export const setConvos = (convos) => ({
  type: SET_CONVOS,
  payload: convos,
})

export const setCurrentConvoid = (convoid) => ({
  type: SET_CURRENT_CONVOID,
  payload: convoid,
})

export const setMessageSearchResults = (messages) => ({
  type: SET_MESSAGE_SEARCH_RESULTS,
  payload: messages,
})

export const setGalleryUrls = (urls) => ({
  type: SET_GALLERY_URLS,
  payload: urls,
})

const INITIAL_STATE = {
  convos: {},
  currentConvoid: null,
  messageSearchResults: [],
  galleryUrls: [],
}

const messagesReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_CONVOS: {
      return {
        ...state,
        convos: payload,
      }
    }
    case SET_CURRENT_CONVOID: {
      return {
        ...state,
        currentConvoid: payload,
      }
    }
    case SET_MESSAGE_SEARCH_RESULTS: {
      return {
        ...state,
        messageSearchResults: payload,
      }
    }
    case SET_GALLERY_URLS: {
      return {
        ...state,
        galleryUrls: payload,
      }
    }
    default:
      return state
  }
}

export default messagesReducer
