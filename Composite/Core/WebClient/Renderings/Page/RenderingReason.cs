namespace Composite.Core.WebClient.Renderings.Page
{
    /// <summary>
    /// Describes a rendering reason
    /// </summary>
    public enum RenderingReason
    {
        /// <summary>
        /// Undefined
        /// </summary>
        Undefined = 0,
        /// <summary>
        /// A page was requested through a browser
        /// </summary>
        PageView = 1,
        /// <summary>
        /// A page is viewed from C1 Console's browser
        /// </summary>
        C1ConsoleBrowserPageView = 2,
        /// <summary>
        /// A page is rendered from withing an "Edit page" workflow
        /// </summary>
        PreviewUnsavedChanges = 4,
        /// <summary>
        /// A page is rendered to generate an image to be used for function/template visualization
        /// </summary>
        ScreenshotGeneration = 8,
        /// <summary>
        /// A page is rendered to build a search index.
        /// </summary>
        BuildSearchIndex = 16
    }
}
