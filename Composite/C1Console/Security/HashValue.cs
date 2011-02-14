using System;


namespace Composite.C1Console.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public sealed class HashValue
	{
        private int _value;



        /// <exclude />
        public HashValue(int value)
        {
            _value = value;
        }



        /// <exclude />
        public string Serialize()
        {
            return _value.ToString();
        }



        /// <exclude />
        public static HashValue Deserialize(string serializedHashValue)
        {            
            int value;

            if (int.TryParse(serializedHashValue, out value) == false)
            {
                throw new ArgumentException("The string is not a valid serialized hash value");
            }

            return new HashValue(value);
        }



        /// <exclude />
        public override bool Equals(object obj)
        {
            return Equals(obj as HashValue);
        }



        /// <exclude />
        public bool Equals(HashValue hashValue)
        {
            if (hashValue == null) return false;

            return _value == hashValue._value;
        }



        /// <exclude />
        public override string ToString()
        {
            return _value.ToString();
        }



        /// <exclude />
        public override int GetHashCode()
        {
            return _value.GetHashCode();
        }
	}
}
