using Composite.Security;
using Composite.Serialization;


namespace Composite.ConsoleEventSystem
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class RefreshTreeMessageQueueItemSerializerHandler : ISerializerHandler
    {
        public string Serialize(object objectToSerialize)
        {
            return EntityTokenSerializer.Serialize(((RefreshTreeMessageQueueItem)objectToSerialize).EntityToken);
        }

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
        public EntityToken EntityToken { get; set; }

        public override string ToString()
        {
            return this.EntityToken.ToString();
        }
    }
}