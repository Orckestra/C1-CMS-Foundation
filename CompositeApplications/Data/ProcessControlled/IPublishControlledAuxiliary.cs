
namespace Composite.Data.ProcessControlled
{
	public interface IPublishControlledAuxiliary
	{
        /// <summary>
        /// This method will be called after the IPublishProcessController.OnAfterDataUpdated has been called
        /// </summary>
        /// <param name="data"></param>
        void OnAfterDataUpdated(IData data);


        /// <summary>
        /// This method will be called after the IPublishProcessController.OnAfterBuildNew has been called
        /// </summary>
        /// <param name="data"></param>
        void OnAfterBuildNew(IData data);
	}
}
