using System.IO;


namespace Composite.Data.Streams
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public sealed class CachedMemoryStream : MemoryStream
    {
        private byte[] _data = null;



        public byte[] Data
        {
            get { return _data; }
        }



        public override void Close()
        {
            SaveData();

            base.Close();
        }



        protected override void Dispose(bool disposing)
        {
            SaveData();

            base.Dispose(disposing);
        }



        private void SaveData()
        {
            if (_data == null)
            {
                this.Seek(0, SeekOrigin.Begin);

                _data = new byte[this.Length];

                this.Read(_data, 0, (int)this.Length);
            }
        }
    }
}
