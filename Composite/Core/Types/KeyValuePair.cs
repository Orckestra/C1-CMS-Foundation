namespace Composite.Core.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class KeyValuePair
    {
        private string _key = "";
        private string _value = "";

        public KeyValuePair()
        {
        }

        public KeyValuePair(string key, string value)
        {
            _key = key;
            _value = value;
        }

        public string Key
        {
            get { return _key; }
            set { _key = value; }
        }

        public string Value
        {
            get { return _value; }
            set { _value = value; }
        }
    }
}