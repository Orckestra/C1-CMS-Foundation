using Composite.EventSystem;


namespace Composite.Sql
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class SqlTableInformationStore
    {
        private static ISqlTableInformationStore _implementation = new SqlTableInformationStoreImpl();

        internal static ISqlTableInformationStore Implementation { get { return _implementation; } set { _implementation = value; } }


        static SqlTableInformationStore()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlush);
        }



        public static ISqlTableInformation GetTableInformation(string connectinoString, string tableName)
        {
            return _implementation.GetTableInformation(connectinoString, tableName);
        }



        private static void OnFlush(FlushEventArgs flushEventArgs)
        {
            _implementation.OnFlush();
        }
    }
}