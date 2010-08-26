namespace Composite.Core.Parallelization.Foundation
{
	internal interface IParallelizationProviderRegistry
	{
        string[] DisabledParallelizationPoints { get; }
        //string DefaultParallelizationProviderName { get; }
        bool Enabled { get; }
        void Flush();
	}
}
