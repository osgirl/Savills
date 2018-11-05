import Types from './';
import Configs from '../../../utils/configs';

export function getWorkOrderList(accessTokenAPI) {
  return {
    type: Types.GET_LIST_WORKORDER,
    payload: {
      api:
        Configs.API +
        '/api/workorders?sorting=dateCreate%20desc&memberId=89474&statusId=11&statusId=13&statusId=14&statusId=15&statusId=16&page=1&pageSize=10',
      method: 'GET',
      //   token: accessTokenAPI
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Ijg5NDc0IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImxlZW5ndXllbiIsIkFzcE5ldC5JZGVudGl0eS5TZWN1cml0eVN0YW1wIjoiTVNKWVhGUkhER1hZNUtCNUxJU1JCUVFCTVBZTlMzSFciLCJHZW5kZXIiOiJNYWxlIiwiVW5pcXVlSWQiOiJhMmIyZmZkZC04ZTA4LTQ5NGEtYmY0OC04ODYwZDEyMDM4YjkiLCJJZENhcmQiOiIzMjEiLCJDb3VudHJ5Q29kZSI6IiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJodHRwOi8vd3d3LmFzcG5ldGJvaWxlcnBsYXRlLmNvbS9pZGVudGl0eS9jbGFpbXMvdGVuYW50SWQiOiI0Iiwic3ViIjoiODk0NzQiLCJqdGkiOiI4MTQ5NzY1My1jM2I4LTQxMTItOTQ2My04NzA5ZTJhMjViYjciLCJpYXQiOjE1NDEwNDk2MTEsIm5iZiI6MTU0MTA0OTYxMSwiZXhwIjoxNTQzNjQxNjExLCJpc3MiOiJTUE1TLVZpZXRuYW0iLCJhdWQiOiJTUE1TLVZpZXRuYW0ifQ.UdFYTbtkzQTSv5ndrFArVKwJ59_c37lK85ZbnSZBucc'
    }
  };
}

export function createWorkOrder(accessTokenAPI) {
  return {
    type: Types.CREATE_WORK_ORDER,
    payload: {
      api:
        Configs.API +
        '/api/services/app/Payment/CreateOrder',
      method: 'GET',
      //   token: accessTokenAPI
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Ijg5NDc0IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImxlZW5ndXllbiIsIkFzcE5ldC5JZGVudGl0eS5TZWN1cml0eVN0YW1wIjoiTVNKWVhGUkhER1hZNUtCNUxJU1JCUVFCTVBZTlMzSFciLCJHZW5kZXIiOiJNYWxlIiwiVW5pcXVlSWQiOiJhMmIyZmZkZC04ZTA4LTQ5NGEtYmY0OC04ODYwZDEyMDM4YjkiLCJJZENhcmQiOiIzMjEiLCJDb3VudHJ5Q29kZSI6IiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJodHRwOi8vd3d3LmFzcG5ldGJvaWxlcnBsYXRlLmNvbS9pZGVudGl0eS9jbGFpbXMvdGVuYW50SWQiOiI0Iiwic3ViIjoiODk0NzQiLCJqdGkiOiI4MTQ5NzY1My1jM2I4LTQxMTItOTQ2My04NzA5ZTJhMjViYjciLCJpYXQiOjE1NDEwNDk2MTEsIm5iZiI6MTU0MTA0OTYxMSwiZXhwIjoxNTQzNjQxNjExLCJpc3MiOiJTUE1TLVZpZXRuYW0iLCJhdWQiOiJTUE1TLVZpZXRuYW0ifQ.UdFYTbtkzQTSv5ndrFArVKwJ59_c37lK85ZbnSZBucc'
    }
  };
}

export function editWorkOrder(accessTokenAPI) {
  return {
    type: Types.CREATE_WORK_ORDER,
    payload: {
      api:
        Configs.API +
        '/api/services/app/Payment/CreateOrder',
      method: 'GET',
      //   token: accessTokenAPI
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Ijg5NDc0IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImxlZW5ndXllbiIsIkFzcE5ldC5JZGVudGl0eS5TZWN1cml0eVN0YW1wIjoiTVNKWVhGUkhER1hZNUtCNUxJU1JCUVFCTVBZTlMzSFciLCJHZW5kZXIiOiJNYWxlIiwiVW5pcXVlSWQiOiJhMmIyZmZkZC04ZTA4LTQ5NGEtYmY0OC04ODYwZDEyMDM4YjkiLCJJZENhcmQiOiIzMjEiLCJDb3VudHJ5Q29kZSI6IiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJodHRwOi8vd3d3LmFzcG5ldGJvaWxlcnBsYXRlLmNvbS9pZGVudGl0eS9jbGFpbXMvdGVuYW50SWQiOiI0Iiwic3ViIjoiODk0NzQiLCJqdGkiOiI4MTQ5NzY1My1jM2I4LTQxMTItOTQ2My04NzA5ZTJhMjViYjciLCJpYXQiOjE1NDEwNDk2MTEsIm5iZiI6MTU0MTA0OTYxMSwiZXhwIjoxNTQzNjQxNjExLCJpc3MiOiJTUE1TLVZpZXRuYW0iLCJhdWQiOiJTUE1TLVZpZXRuYW0ifQ.UdFYTbtkzQTSv5ndrFArVKwJ59_c37lK85ZbnSZBucc'
    }
  };
}

export function detailWordOrder(accessTokenAPI, id) {
  return {
    type: Types.DETAIL_WORK_ORDER,
    payload: {
      api: Configs.API + '/api/services/app/WorkOrders/GetWoById?woId=' + id,
      method: 'GET',
      //   token: accessTokenAPI
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Ijg5NDc0IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImxlZW5ndXllbiIsIkFzcE5ldC5JZGVudGl0eS5TZWN1cml0eVN0YW1wIjoiTVNKWVhGUkhER1hZNUtCNUxJU1JCUVFCTVBZTlMzSFciLCJHZW5kZXIiOiJNYWxlIiwiVW5pcXVlSWQiOiJhMmIyZmZkZC04ZTA4LTQ5NGEtYmY0OC04ODYwZDEyMDM4YjkiLCJJZENhcmQiOiIzMjEiLCJDb3VudHJ5Q29kZSI6IiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJodHRwOi8vd3d3LmFzcG5ldGJvaWxlcnBsYXRlLmNvbS9pZGVudGl0eS9jbGFpbXMvdGVuYW50SWQiOiI0Iiwic3ViIjoiODk0NzQiLCJqdGkiOiI4MTQ5NzY1My1jM2I4LTQxMTItOTQ2My04NzA5ZTJhMjViYjciLCJpYXQiOjE1NDEwNDk2MTEsIm5iZiI6MTU0MTA0OTYxMSwiZXhwIjoxNTQzNjQxNjExLCJpc3MiOiJTUE1TLVZpZXRuYW0iLCJhdWQiOiJTUE1TLVZpZXRuYW0ifQ.UdFYTbtkzQTSv5ndrFArVKwJ59_c37lK85ZbnSZBucc'
    }
  };
}
