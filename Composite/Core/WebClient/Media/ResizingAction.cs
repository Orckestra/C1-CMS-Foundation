namespace Composite.Core.WebClient.Media
{
    /// <summary>    
    /// Resizing action for <see ref="Composite.Core.WebClient.Media.ImageResizer" />
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public enum ResizingAction
    {
        /// <summary>
        /// Stretches image so it fills the specified area. The result image dimensions are newer bigger than original dimensions.
        /// It is the default action
        /// </summary>
        Stretch = 0, 
        /// <summary>
        /// Scales image proportionally down (if necessary) so it fits the specified area.
        /// Also knows as "touch from inside";
        /// </summary>
        Fit = 1,
        /// <summary>
        /// Scales image proportionally down (if necessary) so it fills the specified area. 
        /// </summary>
        Fill = 2,
        /// <summary>
        /// Scales image proportionally down (if necessary) so it fills the specified area, and crops the parts that are outside area's boundaries.
        /// Also knows as "touch from outside";
        /// </summary>
        Crop = 3
    }
}

