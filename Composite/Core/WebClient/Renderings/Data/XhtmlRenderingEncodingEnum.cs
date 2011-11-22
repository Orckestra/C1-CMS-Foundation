namespace Composite.Core.WebClient.Renderings.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public enum XhtmlRenderingEncoding
    {
        /// <summary>Do not encode (data fields are parsable as xml snippet)</summary>
        None = 0,
        /// <summary>Data fields should be parsed for use in xml attribute values</summary>
        AttributeContent = 1,
        /// <summary>Data fields should be parsed for use xml text</summary>
        TextContent = 2,
    }
}
