namespace Composite.Functions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IFunctionInitializationInfo: IMetaFunction
    {
        /// <exclude />
        bool FunctionInitializedCorrectly { get; }
    }
}
