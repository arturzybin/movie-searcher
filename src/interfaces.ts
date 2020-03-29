export interface ISearchData {
   title: string,
   type: string,
   plotLength: string,
   year: string,
   API_KEY: string
}


export interface IAppState {
   shouldStartNewSearch: boolean,
   searchData: ISearchData | {},
   shouldRenderMoviesList: boolean,
   theme: 'light' | 'dark'
}