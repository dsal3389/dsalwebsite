
/**
 * on production mode the routes will fetch
 * the html files from the github absoulte URL instead of
 * the reltive path, this made to make the URL look better
 */
export const appConfig = {
    production: false, // can be changed in the frontend, but why would you do that?
    productionContent: 'content',
    productionFolder: 'dist',
    productionDomain: 'https://dsal3389.github.io/dsalwebsite'
}
