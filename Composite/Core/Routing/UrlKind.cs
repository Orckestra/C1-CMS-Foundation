namespace Composite.Core.Routing
{
    /// <summary>
    /// Url kind
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public enum UrlKind
    {
        /// <exclude />
        Undefined = 0,
        /// <summary>
        /// A main url by with a C1 page is accessed. F.e. "/Home/About.aspx"
        /// </summary>
        Public = 1,
        /// <summary>
        /// Url to an ASP.NET handler. F.e. link to a page: "/Renderers/Page.aspx?id=7446ceda-df90-49f0-a183-4e02ed6f6eec"
        /// Renderer url is expected to be handled without routing.
        /// </summary>
        Renderer = 2,
        /// <summary>
        /// The way links are kept in html content
        /// For pages 
        ///   Short: ~/page({Page id})
        ///   Full:  ~/page({Page id})[ /c1mode(unpublished) ][ /{PathInfo} ][ ?{Query string} ]
        /// For media archive
        ///   Short: ~/media({Media file Id})
        ///   Full:  ~/media({Media file Id})[ ?{Query string} ]
        /// </summary>
        Internal = 5,
        /// <summary>
        /// Friendly url. A short url, by accessing which C1 will make a redirect to related "public" url
        /// </summary>
        Friendly = 3,
        /// <summary>
        /// Redirect url. As in the case of "friendly urls", is used for supporting obsolete urls 
        /// </summary>
        Redirect = 4
    }
}
