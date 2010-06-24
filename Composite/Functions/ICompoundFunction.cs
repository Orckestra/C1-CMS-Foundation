namespace Composite.Functions
{
    /// <summary>
    /// Indicates that a function is allowed to have recursive calls.
    /// </summary>
	public interface ICompoundFunction: IMetaFunction
	{
        bool AllowRecursiveCall { get; }
	}
}
