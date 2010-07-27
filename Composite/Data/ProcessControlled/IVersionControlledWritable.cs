using System;


namespace Composite.Data.ProcessControlled
{
    [Obsolete("To be removed")]
    internal interface IVersionControlledWritable
    {
        /// <summary>
        /// Setter version of the IVersioned.MajorVersionNumber property
        /// </summary>
        /// <param name="versionNumber"></param>
        void SetMajorVersionNumber(int versionNumber);


        /// <summary>
        /// Setter version of the IVersioned.MinorVersionNumber property
        /// </summary>
        /// <param name="versionNumber"></param>
        void SetMinorVersionNumber(int versionNumber);


        /// <summary>
        /// Setter version of the IVersioned.ChangeDate property
        /// </summary>
        /// <param name="changeDate"></param>
        void SetChangeDate(DateTime changeDate);


        /// <summary>
        /// Setter version of the IVersioned.ChangedBy property
        /// </summary>
        /// <param name="changeBy"></param>
        void SetChangedBy(string changeBy);
    }
}

