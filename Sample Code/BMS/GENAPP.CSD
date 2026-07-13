1





   LIST LIST(GENAPP) OBJECTS




 DFH5120 I PRIMARY CSD OPENED;  DDNAME: DFHCSD   - DSNAME: CTS530P8.IYEMZC2S.DFHCSD
1CICS RDO OFF-LINE UTILITY PROGRAM                                                 TIME 15:33 DATE 18.122      PAGE 0001
-DFHCSDUP:   CICS OFF-LINE UTILITY (LIST)                                                         CURRENT RELEASE: 7.0.0

                                              CONTENTS OF CICS SYSTEM DEFINITION FILE (CSD)
                                              ---------------------------------------------

 CSD CREATED BY RELEASE: 6.8.0 - UPGRADED TO RELEASE: 7.0.0.                                 DATE CREATED:   13.073 13:05
                                                                                             LAST UPDATED:   18.122 15:32
 LAST CSD MAINTENANCE UPGRADE USED DFHCURDM AT PTF UI42574  LEVEL.


 ************************************************************************************************************************

 SUMMARY OF LISTS                                                     UTILITY COMMAND:    LIST LIST(GENAPP  )     OBJECTS

 ************************************************************************************************************************

 LIST NAME:     GENAPP
 ----------

    ELEMENT     NAME      DATE ADDED
    -------     ----      ----------

     GROUP      GENA      18.122 15:32
1CICS RDO OFF-LINE UTILITY PROGRAM                                                 TIME 15:33 DATE 18.122      PAGE 0002
-
 ************************************************************************************************************************

 OBJECTS IN GROUPS IN LIST                                            UTILITY COMMAND:    LIST LIST(GENAPP  )     OBJECTS

 ************************************************************************************************************************

 GROUP NAME: GENA
 ----------

 FILE(KSDSCUST)         GROUP(GENA)     DESCRIPTION()                                                        15.052 16:44
                        VSAM-PARAMETERS

                                        DSNAME(BONNERR.GENAPPS.LITE.V5102.KSDSCUST)
                                        RLSACCESS(NO)          LSRPOOLNUM(1)          READINTEG(UNCOMMITTED)
                                        DSNSHARING(ALLREQS)    STRINGS(1)             NSRGROUP()
                        REMOTE-ATTRIBUTES
                                        REMOTESYSTEM()         REMOTENAME()
                        REMOTE-AND-CFDATATABLE-PARAMETERS
                                        RECORDSIZE(225)        KEYLENGTH(10)
                        INITIAL-STATUS
                                        STATUS(ENABLED)        OPENTIME(FIRSTREF)     DISPOSITION(SHARE)
                        BUFFERS
                                        DATABUFFERS(2)         INDEXBUFFERS(1)
                        DATATABLE-PARAMETERS
                                        TABLE(NO)              MAXNUMRECS(NOLIMIT)
                        CFDATATABLE-PARAMETERS
                                        CFDTPOOL()             TABLENAME()            UPDATEMODEL(LOCKING)
                                        LOAD(NO)
                        DATA-FORMAT
                                        RECORDFORMAT(V)
                        OPERATIONS
                                        ADD(YES)               BROWSE(YES)            DELETE(NO)
                                        READ(YES)              UPDATE(YES)
                        AUTO-JOURNALLING
                                        JOURNAL(NO)            JNLREAD(NONE)          JNLSYNCREAD(NO)
                                        JNLUPDATE(NO)          JNLADD(NONE)           JNLSYNCWRITE(YES)
                        RECOVERY-PARAMETERS
                                        RECOVERY(NONE)         FWDRECOVLOG(NO)        BACKUPTYPE(STATIC)
                        DEFINITION-SIGNATURE

                                        DEFINETIME(15/02/21 16:44:32)
                                        CHANGETIME(15/02/21 16:44:32)
                                        CHANGEUSRID(BONNERR)   CHANGEAGENT(CSDBATCH)  CHANGEAGREL(0690)

 FILE(KSDSPOLY)         GROUP(GENA)     DESCRIPTION()                                                        15.052 16:44
                        VSAM-PARAMETERS

                                        DSNAME(BONNERR.GENAPPS.LITE.V5102.KSDSPOLY)
                                        RLSACCESS(NO)          LSRPOOLNUM(1)          READINTEG(UNCOMMITTED)
                                        DSNSHARING(ALLREQS)    STRINGS(1)             NSRGROUP()
                        REMOTE-ATTRIBUTES
                                        REMOTESYSTEM()         REMOTENAME()
                        REMOTE-AND-CFDATATABLE-PARAMETERS
                                        RECORDSIZE(64)         KEYLENGTH(21)
                        INITIAL-STATUS
                                        STATUS(ENABLED)        OPENTIME(FIRSTREF)     DISPOSITION(SHARE)
1CICS RDO OFF-LINE UTILITY PROGRAM                                                 TIME 15:33 DATE 18.122      PAGE 0003
-                       BUFFERS
                                        DATABUFFERS(2)         INDEXBUFFERS(1)
                        DATATABLE-PARAMETERS
                                        TABLE(NO)              MAXNUMRECS(NOLIMIT)
                        CFDATATABLE-PARAMETERS
                                        CFDTPOOL()             TABLENAME()            UPDATEMODEL(LOCKING)
                                        LOAD(NO)
                        DATA-FORMAT
                                        RECORDFORMAT(V)
                        OPERATIONS
                                        ADD(YES)               BROWSE(YES)            DELETE(NO)
                                        READ(YES)              UPDATE(YES)
                        AUTO-JOURNALLING
                                        JOURNAL(NO)            JNLREAD(NONE)          JNLSYNCREAD(NO)
                                        JNLUPDATE(NO)          JNLADD(NONE)           JNLSYNCWRITE(YES)
                        RECOVERY-PARAMETERS
                                        RECOVERY(NONE)         FWDRECOVLOG(NO)        BACKUPTYPE(STATIC)
                        DEFINITION-SIGNATURE

                                        DEFINETIME(15/02/21 16:44:32)
                                        CHANGETIME(15/02/21 16:44:32)
                                        CHANGEUSRID(BONNERR)   CHANGEAGENT(CSDBATCH)  CHANGEAGREL(0690)

 PROGRAM(LGACVS01)      GROUP(GENA)     DESCRIPTION()          LANGUAGE(COBOL)        RELOAD(NO)             15.052 16:44
                                        RESIDENT(NO)           USAGE(NORMAL)          USELPACOPY(NO)
                                        STATUS(ENABLED)        CEDF(YES)              DATALOCATION(ANY)
                                        EXECKEY(USER)          CONCURRENCY(QUASIRENT) API(CICSAPI)
                        REMOTE-ATTRIBUTES
                                        DYNAMIC(NO)            REMOTESYSTEM()         REMOTENAME()
                                        TRANSID()              EXECUTIONSET(FULLAPI)
                        JVM-ATTRIBUTES
                                        JVM(NO)                JVMCLASS()             JVMSERVER()
                        DEFINITION-SIGNATURE

                                        DEFINETIME(15/02/21 16:44:32)
                                        CHANGETIME(15/02/21 16:44:32)
                                        CHANGEUSRID(BONNERR)   CHANGEAGENT(CSDBATCH)  CHANGEAGREL(0690)

 PROGRAM(LGAPOL01)      GROUP(GENA)     DESCRIPTION()          LANGUAGE(COBOL)        RELOAD(NO)             15.052 16:44
                                        RESIDENT(NO)           USAGE(NORMAL)          USELPACOPY(NO)
                                        STATUS(ENABLED)        CEDF(YES)              DATALOCATION(ANY)
                                        EXECKEY(USER)          CONCURRENCY(QUASIRENT) API(CICSAPI)
                        REMOTE-ATTRIBUTES
                                        DYNAMIC(NO)            REMOTESYSTEM()         REMOTENAME()
                                        TRANSID()              EXECUTIONSET(FULLAPI)
                        JVM-ATTRIBUTES
                                        JVM(NO)                JVMCLASS()             JVMSERVER()
                        DEFINITION-SIGNATURE

                                        DEFINETIME(15/02/21 16:44:32)
                                        CHANGETIME(15/02/21 16:44:32)
                                        CHANGEUSRID(BONNERR)   CHANGEAGENT(CSDBATCH)  CHANGEAGREL(0690)

 PROGRAM(LGAPVS01)      GROUP(GENA)     DESCRIPTION()          LANGUAGE(COBOL)        RELOAD(NO)             15.052 16:44
                                        RESIDENT(NO)           USAGE(NORMAL)          USELPACOPY(NO)
                                        STATUS(ENABLED)        CEDF(YES)              DATALOCATION(ANY)
                                        EXECKEY(USER)          CONCURRENCY(QUASIRENT) API(CICSAPI)
1CICS RDO OFF-LINE UTILITY PROGRAM                                                 TIME 15:33 DATE 18.122      PAGE 0004
-                       REMOTE-ATTRIBUTES
                                        DYNAMIC(NO)            REMOTESYSTEM()         REMOTENAME()
                                        TRANSID()              EXECUTIONSET(FULLAPI)
                        JVM-ATTRIBUTES
                                        JVM(NO)                JVMCLASS()             JVMSERVER()
                        DEFINITION-SIGNATURE

                                        DEFINETIME(15/02/21 16:44:32)
                                        CHANGETIME(15/02/21 16:44:32)
                                        CHANGEUSRID(BONNERR)   CHANGEAGENT(CSDBATCH)  CHANGEAGREL(0690)

 PROGRAM(LGICVS01)      GROUP(GENA)     DESCRIPTION()          LANGUAGE(COBOL)        RELOAD(NO)             15.052 16:44
                                        RESIDENT(NO)           USAGE(NORMAL)          USELPACOPY(NO)
                                        STATUS(ENABLED)        CEDF(YES)              DATALOCATION(ANY)
                                        EXECKEY(USER)          CONCURRENCY(QUASIRENT) API(CICSAPI)
                        REMOTE-ATTRIBUTES
                                        DYNAMIC(NO)            REMOTESYSTEM()         REMOTENAME()
                                        TRANSID()              EXECUTIONSET(FULLAPI)
                        JVM-ATTRIBUTES
                                        JVM(NO)                JVMCLASS()             JVMSERVER()
                        DEFINITION-SIGNATURE

                                        DEFINETIME(15/02/21 16:44:32)
                                        CHANGETIME(15/02/21 16:44:32)
                                        CHANGEUSRID(BONNERR)   CHANGEAGENT(CSDBATCH)  CHANGEAGREL(0690)

 PROGRAM(LGIPOL01)      GROUP(GENA)     DESCRIPTION()          LANGUAGE(COBOL)        RELOAD(NO)             15.052 16:44
                                        RESIDENT(NO)           USAGE(NORMAL)          USELPACOPY(NO)
                                        STATUS(ENABLED)        CEDF(YES)              DATALOCATION(ANY)
                                        EXECKEY(USER)          CONCURRENCY(QUASIRENT) API(CICSAPI)
                        REMOTE-ATTRIBUTES
                                        DYNAMIC(NO)            REMOTESYSTEM()         REMOTENAME()
                                        TRANSID()              EXECUTIONSET(FULLAPI)
                        JVM-ATTRIBUTES
                                        JVM(NO)                JVMCLASS()             JVMSERVER()
                        DEFINITION-SIGNATURE

                                        DEFINETIME(15/02/21 16:44:32)
                                        CHANGETIME(15/02/21 16:44:32)
                                        CHANGEUSRID(BONNERR)   CHANGEAGENT(CSDBATCH)  CHANGEAGREL(0690)

 PROGRAM(LGIPVS01)      GROUP(GENA)     DESCRIPTION()          LANGUAGE(COBOL)        RELOAD(NO)             15.052 16:44
                                        RESIDENT(NO)           USAGE(NORMAL)          USELPACOPY(NO)
                                        STATUS(ENABLED)        CEDF(YES)              DATALOCATION(ANY)
                                        EXECKEY(USER)          CONCURRENCY(QUASIRENT) API(CICSAPI)
                        REMOTE-ATTRIBUTES
                                        DYNAMIC(NO)            REMOTESYSTEM()         REMOTENAME()
                                        TRANSID()              EXECUTIONSET(FULLAPI)
                        JVM-ATTRIBUTES
                                        JVM(NO)                JVMCLASS()             JVMSERVER()
                        DEFINITION-SIGNATURE

                                        DEFINETIME(15/02/21 16:44:32)
                                        CHANGETIME(15/02/21 16:44:32)
                                        CHANGEUSRID(BONNERR)   CHANGEAGENT(CSDBATCH)  CHANGEAGREL(0690)

 PROGRAM(LGSTSQ)        GROUP(GENA)     DESCRIPTION()          LANGUAGE(COBOL)        RELOAD(NO)             15.052 16:44
1CICS RDO OFF-LINE UTILITY PROGRAM                                                 TIME 15:33 DATE 18.122      PAGE 0005
-                                       RESIDENT(NO)           USAGE(NORMAL)          USELPACOPY(NO)
                                        STATUS(ENABLED)        CEDF(YES)              DATALOCATION(ANY)
                                        EXECKEY(USER)          CONCURRENCY(QUASIRENT) API(CICSAPI)
                        REMOTE-ATTRIBUTES
                                        DYNAMIC(NO)            REMOTESYSTEM()         REMOTENAME()
                                        TRANSID()              EXECUTIONSET(FULLAPI)
                        JVM-ATTRIBUTES
                                        JVM(NO)                JVMCLASS()             JVMSERVER()
                        DEFINITION-SIGNATURE

                                        DEFINETIME(15/02/21 16:44:32)
                                        CHANGETIME(15/02/21 16:44:32)
                                        CHANGEUSRID(BONNERR)   CHANGEAGENT(CSDBATCH)  CHANGEAGREL(0690)

 PROGRAM(LGTESTC1)      GROUP(GENA)                                                                          15.052 16:44
                                        DESCRIPTION(Solution Customer Menu)
                                        LANGUAGE(COBOL)        RELOAD(NO)             RESIDENT(NO)
                                        USAGE(NORMAL)          USELPACOPY(NO)         STATUS(ENABLED)
                                        CEDF(YES)              DATALOCATION(ANY)      EXECKEY(USER)
                                        CONCURRENCY(QUASIRENT) API(CICSAPI)
                        REMOTE-ATTRIBUTES
                                        DYNAMIC(NO)            REMOTESYSTEM()         REMOTENAME()
                                        TRANSID()              EXECUTIONSET(FULLAPI)
                        JVM-ATTRIBUTES
                                        JVM(NO)                JVMCLASS()             JVMSERVER()
                        DEFINITION-SIGNATURE

                                        DEFINETIME(15/02/21 16:44:32)
                                        CHANGETIME(15/02/21 16:44:32)
                                        CHANGEUSRID(BONNERR)   CHANGEAGENT(CSDBATCH)  CHANGEAGREL(0690)

 PROGRAM(LGTESTP1)      GROUP(GENA)                                                                          15.052 16:44
                                        DESCRIPTION(Solution Policy menu)
                                        LANGUAGE(COBOL)        RELOAD(NO)             RESIDENT(NO)
                                        USAGE(NORMAL)          USELPACOPY(NO)         STATUS(ENABLED)
                                        CEDF(YES)              DATALOCATION(ANY)      EXECKEY(USER)
                                        CONCURRENCY(QUASIRENT) API(CICSAPI)
                        REMOTE-ATTRIBUTES
                                        DYNAMIC(NO)            REMOTESYSTEM()         REMOTENAME()
                                        TRANSID()              EXECUTIONSET(FULLAPI)
                        JVM-ATTRIBUTES
                                        JVM(NO)                JVMCLASS()             JVMSERVER()
                        DEFINITION-SIGNATURE

                                        DEFINETIME(15/02/21 16:44:32)
                                        CHANGETIME(15/02/21 16:44:32)
                                        CHANGEUSRID(BONNERR)   CHANGEAGENT(CSDBATCH)  CHANGEAGREL(0690)

 PROGRAM(LGTESTP2)      GROUP(GENA)                                                                          15.052 16:44
                                        DESCRIPTION(Solution Policy menu)
                                        LANGUAGE(COBOL)        RELOAD(NO)             RESIDENT(NO)
                                        USAGE(NORMAL)          USELPACOPY(NO)         STATUS(ENABLED)
                                        CEDF(YES)              DATALOCATION(ANY)      EXECKEY(USER)
                                        CONCURRENCY(QUASIRENT) API(CICSAPI)
                        REMOTE-ATTRIBUTES
                                        DYNAMIC(NO)            REMOTESYSTEM()         REMOTENAME()
                                        TRANSID()              EXECUTIONSET(FULLAPI)
1CICS RDO OFF-LINE UTILITY PROGRAM                                                 TIME 15:33 DATE 18.122      PAGE 0006
-                       JVM-ATTRIBUTES
                                        JVM(NO)                JVMCLASS()             JVMSERVER()
                        DEFINITION-SIGNATURE

                                        DEFINETIME(15/02/21 16:44:32)
                                        CHANGETIME(15/02/21 16:44:32)
                                        CHANGEUSRID(BONNERR)   CHANGEAGENT(CSDBATCH)  CHANGEAGREL(0690)

 PROGRAM(LGTESTP3)      GROUP(GENA)                                                                          15.052 16:44
                                        DESCRIPTION(Solution Policy menu)
                                        LANGUAGE(COBOL)        RELOAD(NO)             RESIDENT(NO)
                                        USAGE(NORMAL)          USELPACOPY(NO)         STATUS(ENABLED)
                                        CEDF(YES)              DATALOCATION(ANY)      EXECKEY(USER)
                                        CONCURRENCY(QUASIRENT) API(CICSAPI)
                        REMOTE-ATTRIBUTES
                                        DYNAMIC(NO)            REMOTESYSTEM()         REMOTENAME()
                                        TRANSID()              EXECUTIONSET(FULLAPI)
                        JVM-ATTRIBUTES
                                        JVM(NO)                JVMCLASS()             JVMSERVER()
                        DEFINITION-SIGNATURE

                                        DEFINETIME(15/02/21 16:44:32)
                                        CHANGETIME(15/02/21 16:44:32)
                                        CHANGEUSRID(BONNERR)   CHANGEAGENT(CSDBATCH)  CHANGEAGREL(0690)

 PROGRAM(LGTESTP4)      GROUP(GENA)                                                                          15.052 16:44
                                        DESCRIPTION(Solution Policy menu)
                                        LANGUAGE(COBOL)        RELOAD(NO)             RESIDENT(NO)
                                        USAGE(NORMAL)          USELPACOPY(NO)         STATUS(ENABLED)
                                        CEDF(YES)              DATALOCATION(ANY)      EXECKEY(USER)
                                        CONCURRENCY(QUASIRENT) API(CICSAPI)
                        REMOTE-ATTRIBUTES
                                        DYNAMIC(NO)            REMOTESYSTEM()         REMOTENAME()
                                        TRANSID()              EXECUTIONSET(FULLAPI)
                        JVM-ATTRIBUTES
                                        JVM(NO)                JVMCLASS()             JVMSERVER()
                        DEFINITION-SIGNATURE

                                        DEFINETIME(15/02/21 16:44:32)
                                        CHANGETIME(15/02/21 16:44:32)
                                        CHANGEUSRID(BONNERR)   CHANGEAGENT(CSDBATCH)  CHANGEAGREL(0690)

 PROGRAM(LGUCVS01)      GROUP(GENA)     DESCRIPTION()          LANGUAGE(COBOL)        RELOAD(NO)             15.052 16:44
                                        RESIDENT(NO)           USAGE(NORMAL)          USELPACOPY(NO)
                                        STATUS(ENABLED)        CEDF(YES)              DATALOCATION(ANY)
                                        EXECKEY(USER)          CONCURRENCY(QUASIRENT) API(CICSAPI)
                        REMOTE-ATTRIBUTES
                                        DYNAMIC(NO)            REMOTESYSTEM()         REMOTENAME()
                                        TRANSID()              EXECUTIONSET(FULLAPI)
                        JVM-ATTRIBUTES
                                        JVM(NO)                JVMCLASS()             JVMSERVER()
                        DEFINITION-SIGNATURE

                                        DEFINETIME(15/02/21 16:44:32)
                                        CHANGETIME(15/02/21 16:44:32)
                                        CHANGEUSRID(BONNERR)   CHANGEAGENT(CSDBATCH)  CHANGEAGREL(0690)

1CICS RDO OFF-LINE UTILITY PROGRAM                                                 TIME 15:33 DATE 18.122      PAGE 0007
-PROGRAM(SSMAP)         GROUP(GENA)     DESCRIPTION(BMS Map)   LANGUAGE(COBOL)        RELOAD(NO)             15.052 16:44
                                        RESIDENT(NO)           USAGE(NORMAL)          USELPACOPY(NO)
                                        STATUS(ENABLED)        CEDF(YES)              DATALOCATION(ANY)
                                        EXECKEY(USER)          CONCURRENCY(QUASIRENT) API(CICSAPI)
                        REMOTE-ATTRIBUTES
                                        DYNAMIC(NO)            REMOTESYSTEM()         REMOTENAME()
                                        TRANSID()              EXECUTIONSET(FULLAPI)
                        JVM-ATTRIBUTES
                                        JVM(NO)                JVMCLASS()             JVMSERVER()
                        DEFINITION-SIGNATURE

                                        DEFINETIME(15/02/21 16:44:32)
                                        CHANGETIME(15/02/21 16:44:32)
                                        CHANGEUSRID(BONNERR)   CHANGEAGENT(CSDBATCH)  CHANGEAGREL(0690)

 TRANSACTION(LGCF)      GROUP(GENA)     DESCRIPTION()          PROGRAM(LGICVS01)      TWASIZE(0)             15.052 16:44
                                        PROFILE(DFHCICST)      PARTITIONSET()         STATUS(ENABLED)
                                        TASKDATALOC(ANY)       TASKDATAKEY(USER)      STORAGECLEAR(NO)
                                        RUNAWAY(SYSTEM)        SHUTDOWN(DISABLED)     ISOLATE(YES)
                                        BREXIT()
                        REMOTE-ATTRIBUTES
                                        DYNAMIC(NO)            ROUTABLE(NO)           REMOTESYSTEM()
                                        REMOTENAME()           TRPROF()               LOCALQ()
                        SCHEDULING
                                        PRIORITY(1)            TRANCLASS(DFHTCL00)
                        ALIASES
                                        ALIAS()                TASKREQ()              XTRANID()
                                        TPNAME()               XTPNAME()
                        RECOVERY
                                        DTIMOUT(NO)            RESTART(NO)            SPURGE(NO)
                                        TPURGE(NO)             DUMP(YES)              TRACE(YES)
                                        CONFDATA(NO)           OTSTIMEOUT(NO)
                        INDOUBT-ATTRIBUTES
                                        ACTION(BACKOUT)        WAIT(YES)              WAITTIME(0,0,0)
                        SECURITY
                                        RESSEC(NO)             CMDSEC(NO)
                        DEFINITION-SIGNATURE

                                        DEFINETIME(15/02/21 16:44:32)
                                        CHANGETIME(15/02/21 16:44:32)
                                        CHANGEUSRID(BONNERR)   CHANGEAGENT(CSDBATCH)  CHANGEAGREL(0690)

 TRANSACTION(SSC1)      GROUP(GENA)     DESCRIPTION()          PROGRAM(LGTESTC1)      TWASIZE(0)             15.052 16:44
                                        PROFILE(DFHCICST)      PARTITIONSET()         STATUS(ENABLED)
                                        TASKDATALOC(ANY)       TASKDATAKEY(USER)      STORAGECLEAR(NO)
                                        RUNAWAY(SYSTEM)        SHUTDOWN(DISABLED)     ISOLATE(YES)
                                        BREXIT()
                        REMOTE-ATTRIBUTES
                                        DYNAMIC(NO)            ROUTABLE(NO)           REMOTESYSTEM()
                                        REMOTENAME()           TRPROF()               LOCALQ()
                        SCHEDULING
                                        PRIORITY(1)            TRANCLASS(DFHTCL00)
                        ALIASES
                                        ALIAS()                TASKREQ()              XTRANID()
                                        TPNAME()               XTPNAME()
                        RECOVERY
                                        DTIMOUT(NO)            RESTART(NO)            SPURGE(NO)
1CICS RDO OFF-LINE UTILITY PROGRAM                                                 TIME 15:33 DATE 18.122      PAGE 0008
-                                       TPURGE(NO)             DUMP(YES)              TRACE(YES)
                                        CONFDATA(NO)           OTSTIMEOUT(NO)
                        INDOUBT-ATTRIBUTES
                                        ACTION(BACKOUT)        WAIT(YES)              WAITTIME(0,0,0)
                        SECURITY
                                        RESSEC(NO)             CMDSEC(NO)
                        DEFINITION-SIGNATURE

                                        DEFINETIME(15/02/21 16:44:32)
                                        CHANGETIME(15/02/21 16:44:32)
                                        CHANGEUSRID(BONNERR)   CHANGEAGENT(CSDBATCH)  CHANGEAGREL(0690)

 TRANSACTION(SSP1)      GROUP(GENA)     DESCRIPTION()          PROGRAM(LGTESTP1)      TWASIZE(0)             15.052 16:44
                                        PROFILE(DFHCICST)      PARTITIONSET()         STATUS(ENABLED)
                                        TASKDATALOC(ANY)       TASKDATAKEY(USER)      STORAGECLEAR(NO)
                                        RUNAWAY(SYSTEM)        SHUTDOWN(DISABLED)     ISOLATE(YES)
                                        BREXIT()
                        REMOTE-ATTRIBUTES
                                        DYNAMIC(NO)            ROUTABLE(NO)           REMOTESYSTEM()
                                        REMOTENAME()           TRPROF()               LOCALQ()
                        SCHEDULING
                                        PRIORITY(1)            TRANCLASS(DFHTCL00)
                        ALIASES
                                        ALIAS()                TASKREQ()              XTRANID()
                                        TPNAME()               XTPNAME()
                        RECOVERY
                                        DTIMOUT(NO)            RESTART(NO)            SPURGE(NO)
                                        TPURGE(NO)             DUMP(YES)              TRACE(YES)
                                        CONFDATA(NO)           OTSTIMEOUT(NO)
                        INDOUBT-ATTRIBUTES
                                        ACTION(BACKOUT)        WAIT(YES)              WAITTIME(0,0,0)
                        SECURITY
                                        RESSEC(NO)             CMDSEC(NO)
                        DEFINITION-SIGNATURE

                                        DEFINETIME(15/02/21 16:44:32)
                                        CHANGETIME(15/02/21 16:44:32)
                                        CHANGEUSRID(BONNERR)   CHANGEAGENT(CSDBATCH)  CHANGEAGREL(0690)

 TRANSACTION(SSP2)      GROUP(GENA)     DESCRIPTION()          PROGRAM(LGTESTP2)      TWASIZE(0)             15.052 16:44
                                        PROFILE(DFHCICST)      PARTITIONSET()         STATUS(ENABLED)
                                        TASKDATALOC(ANY)       TASKDATAKEY(USER)      STORAGECLEAR(NO)
                                        RUNAWAY(SYSTEM)        SHUTDOWN(DISABLED)     ISOLATE(YES)
                                        BREXIT()
                        REMOTE-ATTRIBUTES
                                        DYNAMIC(NO)            ROUTABLE(NO)           REMOTESYSTEM()
                                        REMOTENAME()           TRPROF()               LOCALQ()
                        SCHEDULING
                                        PRIORITY(1)            TRANCLASS(DFHTCL00)
                        ALIASES
                                        ALIAS()                TASKREQ()              XTRANID()
                                        TPNAME()               XTPNAME()
                        RECOVERY
                                        DTIMOUT(NO)            RESTART(NO)            SPURGE(NO)
                                        TPURGE(NO)             DUMP(YES)              TRACE(YES)
                                        CONFDATA(NO)           OTSTIMEOUT(NO)
                        INDOUBT-ATTRIBUTES
1CICS RDO OFF-LINE UTILITY PROGRAM                                                 TIME 15:33 DATE 18.122      PAGE 0009
-                                       ACTION(BACKOUT)        WAIT(YES)              WAITTIME(0,0,0)
                        SECURITY
                                        RESSEC(NO)             CMDSEC(NO)
                        DEFINITION-SIGNATURE

                                        DEFINETIME(15/02/21 16:44:32)
                                        CHANGETIME(15/02/21 16:44:32)
                                        CHANGEUSRID(BONNERR)   CHANGEAGENT(CSDBATCH)  CHANGEAGREL(0690)

 TRANSACTION(SSP3)      GROUP(GENA)     DESCRIPTION()          PROGRAM(LGTESTP3)      TWASIZE(0)             15.052 16:44
                                        PROFILE(DFHCICST)      PARTITIONSET()         STATUS(ENABLED)
                                        TASKDATALOC(ANY)       TASKDATAKEY(USER)      STORAGECLEAR(NO)
                                        RUNAWAY(SYSTEM)        SHUTDOWN(DISABLED)     ISOLATE(YES)
                                        BREXIT()
                        REMOTE-ATTRIBUTES
                                        DYNAMIC(NO)            ROUTABLE(NO)           REMOTESYSTEM()
                                        REMOTENAME()           TRPROF()               LOCALQ()
                        SCHEDULING
                                        PRIORITY(1)            TRANCLASS(DFHTCL00)
                        ALIASES
                                        ALIAS()                TASKREQ()              XTRANID()
                                        TPNAME()               XTPNAME()
                        RECOVERY
                                        DTIMOUT(NO)            RESTART(NO)            SPURGE(NO)
                                        TPURGE(NO)             DUMP(YES)              TRACE(YES)
                                        CONFDATA(NO)           OTSTIMEOUT(NO)
                        INDOUBT-ATTRIBUTES
                                        ACTION(BACKOUT)        WAIT(YES)              WAITTIME(0,0,0)
                        SECURITY
                                        RESSEC(NO)             CMDSEC(NO)
                        DEFINITION-SIGNATURE

                                        DEFINETIME(15/02/21 16:44:32)
                                        CHANGETIME(15/02/21 16:44:32)
                                        CHANGEUSRID(BONNERR)   CHANGEAGENT(CSDBATCH)  CHANGEAGREL(0690)

 TRANSACTION(SSP4)      GROUP(GENA)     DESCRIPTION()          PROGRAM(LGTESTP4)      TWASIZE(0)             15.052 16:44
                                        PROFILE(DFHCICST)      PARTITIONSET()         STATUS(ENABLED)
                                        TASKDATALOC(ANY)       TASKDATAKEY(USER)      STORAGECLEAR(NO)
                                        RUNAWAY(SYSTEM)        SHUTDOWN(DISABLED)     ISOLATE(YES)
                                        BREXIT()
                        REMOTE-ATTRIBUTES
                                        DYNAMIC(NO)            ROUTABLE(NO)           REMOTESYSTEM()
                                        REMOTENAME()           TRPROF()               LOCALQ()
                        SCHEDULING
                                        PRIORITY(1)            TRANCLASS(DFHTCL00)
                        ALIASES
                                        ALIAS()                TASKREQ()              XTRANID()
                                        TPNAME()               XTPNAME()
                        RECOVERY
                                        DTIMOUT(NO)            RESTART(NO)            SPURGE(NO)
                                        TPURGE(NO)             DUMP(YES)              TRACE(YES)
                                        CONFDATA(NO)           OTSTIMEOUT(NO)
                        INDOUBT-ATTRIBUTES
                                        ACTION(BACKOUT)        WAIT(YES)              WAITTIME(0,0,0)
                        SECURITY
                                        RESSEC(NO)             CMDSEC(NO)
1CICS RDO OFF-LINE UTILITY PROGRAM                                                 TIME 15:33 DATE 18.122      PAGE 0010
-                       DEFINITION-SIGNATURE

                                        DEFINETIME(15/02/21 16:44:32)
                                        CHANGETIME(15/02/21 16:44:32)
                                        CHANGEUSRID(BONNERR)   CHANGEAGENT(CSDBATCH)  CHANGEAGREL(0690)

 LIBRARY(GENALIB)       GROUP(GENA)     DESCRIPTION()          RANKING(50)            CRITICAL(NO)           15.052 16:44
                                        STATUS(ENABLED)
                        DATA-SET-NAMES

                                        DSNAME01(BONNERR.GENAPPS.LITE.V5102.LOAD)
                                        DSNAME02()             DSNAME03()             DSNAME04()
                                        DSNAME05()             DSNAME06()             DSNAME07()
                                        DSNAME08()             DSNAME09()             DSNAME10()
                                        DSNAME11()             DSNAME12()             DSNAME13()
                                        DSNAME14()             DSNAME15()             DSNAME16()
                        DEFINITION-SIGNATURE

                                        DEFINETIME(15/02/21 16:44:32)
                                        CHANGETIME(15/02/21 16:44:32)
                                        CHANGEUSRID(BONNERR)   CHANGEAGENT(CSDBATCH)  CHANGEAGREL(0690)

 TCPIPSERVICE(GENATCP1) GROUP(GENA)     DESCRIPTION()          URM(NONE)              PORTNUMBER(9041)       16.119 10:59
                                        STATUS(OPEN)           PROTOCOL(HTTP)         TRANSACTION(CWXN)
                                        BACKLOG(0)             HOST(ANY)              IPADDRESS(ANY)
                                        SPECIFTCPS()           SOCKETCLOSE(NO)        MAXPERSIST(NO)
                                        MAXDATALEN(32)
                        SECURITY
                                        SSL(NO)                CERTIFICATE()          CIPHERS()
                                        AUTHENTICATE(NO)       REALM()                ATTACHSEC()
                        DNS-CONNECTION-BALANCINGDEFINITION-SIGNATURE

                                        DEFINETIME(16/04/28 10:59:43)
                                        CHANGETIME(16/04/28 10:59:43)
                                        CHANGEUSRID(BONNERR)   CHANGEAGENT(CSDBATCH)  CHANGEAGREL(0700)

 PIPELINE(GENAPIP1)     GROUP(GENA)     DESCRIPTION()          STATUS(ENABLED)        RESPWAIT(DEFT)         16.119 10:59
                                        CONFIGFILE(/cics/cics700/samples/pipelines/basicsoap11provider.xml)
                                        SHELF(/var/cicsts/shelf/)
                                        WSDIR(/u/isccicu/genapp/cicsregn/v53/soapws/wsdir/)
                        DEFINITION-SIGNATURE

                                        DEFINETIME(16/04/28 10:59:43)
                                        CHANGETIME(16/04/28 10:59:43)
                                        CHANGEUSRID(BONNERR)   CHANGEAGENT(CSDBATCH)  CHANGEAGREL(0700)

 PIPELINE(GENAPIP2)     GROUP(GENA)     DESCRIPTION()          STATUS(ENABLED)        RESPWAIT(DEFT)         16.119 10:59
                                        CONFIGFILE(/cics/cics700/samples/pipelines/jsonjavaprovider.xml)
                                        SHELF(/var/cicsts/shelf/)
                                        WSDIR(/u/isccicu/genapp/cicsregn/v53/jsonws/wsdir/)
                        DEFINITION-SIGNATURE

                                        DEFINETIME(16/04/28 10:59:43)
                                        CHANGETIME(16/04/28 10:59:43)
                                        CHANGEUSRID(BONNERR)   CHANGEAGENT(CSDBATCH)  CHANGEAGREL(0700)

 ************************************************************************************************************************
1CICS RDO OFF-LINE UTILITY PROGRAM                                                 TIME 15:33 DATE 18.122      PAGE 0011
-

 ************************************************************************************************************************
1CICS RDO OFF-LINE UTILITY PROGRAM                                                 TIME 15:33 DATE 18.122      PAGE 0012
-
 DFH5101 I LIST COMMAND EXECUTED SUCCESSFULLY.
 DFH5123 I PRIMARY CSD CLOSED;  DDNAME: DFHCSD   - DSNAME: CTS530P8.IYEMZC2S.DFHCSD




 DFH5107 I COMMANDS EXECUTED SUCCESSFULLY: 1     COMMANDS GIVING WARNING(S): 0     COMMANDS IN ERROR: 0
 DFH5108 I COMMANDS NOT EXECUTED AFTER ERROR(S): 0
 DFH5109 I END OF DFHCSDUP UTILITY JOB. HIGHEST RETURN CODE WAS: 0
