namespace Composite.Functions
{
    /// <summary>
    /// Indicates that a function is allowed to have recursive calls.
    /// </summary>
	internal interface ICompoundFunction: IMetaFunction
	{
        bool AllowRecursiveCall { get; }
	}
}
