using System;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Threading;


namespace Composite.Core.Threading
{
    /// <summary>
    /// Algorithm
    /// 
    /// Initial:  None of the files exists. Enter is allowed. Leave is an exception.
    ///    - Write phase one file
    ///    - Delete phase two file
    /// 
    /// Enter: Wait until phase two file exists and phase one does not exist. Other AD/Thread has left.
    ///        Exception: Only wait for max ms
    ///        - Write phase one file (Preventing other Enter's)
    ///        - Delete phase two file
    /// 
    /// Leave: If phase one file exists (if not => I have timed out)
    ///        - Write phase two file (Allowes other Enter's)
    ///        - Delete phase one file
    /// 
    /// </summary>
    internal class TwoPhaseFileLock
    {
        private string PhaseOneFilePath { get; set; }
        private string PhaseTwoFilePath { get; set; }

        public TwoPhaseFileLock(string id, string workDirectory)
        {
            Timeout = 45000;
            PhaseOneFilePath = Path.Combine(workDirectory, id + ".entered");
            PhaseTwoFilePath = Path.Combine(workDirectory, id + ".left");
        }


        /// <summary>
        /// Time out time in ms. Default is 10000
        /// </summary>
        public int Timeout { get; set; }


        /// <summary>
        /// Acquires the lock.
        /// </summary>
        /// <returns>
        /// Returns true if the lock was obtained successfully. 
        /// Returns false if the lock was acquried due to timeout.
        /// </returns>
        [SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public bool Acquire()
        {                        
            bool gotTheLock = false;
            if (IsFirstTime())
            {
                gotTheLock = true;
            }
            else
            {
                gotTheLock = true;
                int startTime = Environment.TickCount;

                while (File.Exists(PhaseOneFilePath) && !File.Exists(PhaseTwoFilePath))
                {
                    Thread.Sleep(50);

                    int timeElapsed = Environment.TickCount - startTime;
                    if (timeElapsed >= Timeout)
                    {
                        gotTheLock = false;
                        break;
                    }
                }
            }

            Log.LogInformation("TwoPhaseFileLock", string.Format("AppDomain {0} acquiring the lock ({1})", AppDomain.CurrentDomain.Id, gotTheLock));

            File.WriteAllText(PhaseOneFilePath, "");
            SafeDelete(PhaseTwoFilePath);

            return gotTheLock;
        }



        /// <summary>
        /// Releases the lock.
        /// </summary>
        [SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public void Release()
        {
            Log.LogInformation("TwoPhaseFileLock", string.Format("AppDomain {0} releasing the lock", AppDomain.CurrentDomain.Id));

            if (IsFirstTime())
            {
                throw new InvalidOperationException("Releasing the lock is not allowed before it has been acquired!");
            }
            if (File.Exists(PhaseOneFilePath))
            {
                File.WriteAllText(PhaseTwoFilePath, "");
                SafeDelete(PhaseOneFilePath);
            }
        }

        [SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        private bool IsFirstTime()
        {
            return !File.Exists(PhaseOneFilePath) && !File.Exists(PhaseTwoFilePath);
        }


        [SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        private static void SafeDelete(string filePath)
        {
            try
            {
                if (File.Exists(filePath))
                {
                    File.Delete(filePath);
                }
            }
            catch (Exception)
            {
                // Ignore
            }
        }
    }
}
