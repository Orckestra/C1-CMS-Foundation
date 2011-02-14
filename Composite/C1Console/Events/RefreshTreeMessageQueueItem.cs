using Composite.C1Console.Security;
using Composite.Core.Serialization;


namespace Composite.C1Console.Events
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class RefreshTreeMessageQueueItemSerializerHandler : ISerializerHandler
    {
        /// <exclude />
        public string Serialize(object objectToSerialize)
        {
            return EntityTokenSerializer.Serialize(((RefreshTreeMessageQueueItem)objectToSerialize).EntityToken);
        }


        /// <exclude />
        public object Deserialize(string serializedObject)
        {
            RefreshTreeMessageQueueItem result = new RefreshTreeMessageQueueItem();

            result.EntityToken = EntityTokenSerializer.Deserialize(serializedObject);

            return result;
        }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SerializerHandler(typeof(RefreshTreeMessageQueueItemSerializerHandler))]
    public sealed class RefreshTreeMessageQueueItem : IConsoleMessageQueueItem
    {
        /// <exclude />
        public EntityToken EntityToken { get; set; }


        /// <exclude />
        public override string ToString()
        {
            return this.EntityToken.ToString();
        }
    }
}