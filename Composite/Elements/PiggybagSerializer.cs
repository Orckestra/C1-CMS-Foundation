using System.Collections.Generic;
using System.Text;
using Composite.Serialization;


namespace Composite.Elements
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class PiggybagSerializer
	{
        public static string Serialize(Dictionary<string, string> piggybag)
        {
            var sb = new StringBuilder();

            foreach (KeyValuePair<string, string> kvp in piggybag)
            {
                StringConversionServices.SerializeKeyValuePair(sb, kvp.Key, kvp.Value);
            }

            return sb.ToString();
        }



        public static Dictionary<string, string> Deserialize(string serializedPiggybag)
        {
            Dictionary<string, string> piggyback = new Dictionary<string, string>();

            Dictionary<string, string> dic = StringConversionServices.ParseKeyValueCollection(serializedPiggybag);

            foreach (var kvp in dic)
            {
                piggyback.Add(kvp.Key, StringConversionServices.DeserializeValueString(kvp.Value));
            }

            return piggyback;
        }
	}
}
