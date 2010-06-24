namespace Composite.Parallelization.Foundation
{
	internal interface IParallelizationProviderRegistry
	{
        string[] DisabledParallelizationPoints { get; }
        //string DefaultParallelizationProviderName { get; }
        bool Enabled { get; }
        void Flush();
	}
}
