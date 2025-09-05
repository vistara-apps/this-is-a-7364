// Comprehensive state-specific legal information for police encounters
// This data should be regularly updated by legal experts

export const STATE_LEGAL_DATA = {
  'Alabama': {
    summary: 'In Alabama, citizens have constitutional rights during police encounters. You have the right to remain silent, refuse consent searches, and ask if you are free to leave. Alabama follows federal constitutional protections.',
    keyRights: [
      'Right to remain silent under 5th Amendment',
      'Right to refuse consent searches without warrant',
      'Right to ask if you are free to leave',
      'Right to have attorney present during questioning',
      'Right to record police interactions in public spaces'
    ],
    importantNotes: [
      'Alabama has "stop and identify" laws - you may be required to provide identification if lawfully detained',
      'Recording police is legal in public spaces but avoid interfering with police duties',
      'Vehicle searches require probable cause, warrant, or valid consent'
    ],
    stopAndIdentify: true,
    recordingLegal: true,
    lastUpdated: '2024-01-15'
  },
  
  'Alaska': {
    summary: 'Alaska provides strong constitutional protections during police encounters. Citizens have the right to remain silent, refuse searches, and record police interactions. Alaska\'s constitution provides additional privacy protections.',
    keyRights: [
      'Right to remain silent',
      'Right to refuse consent searches',
      'Right to ask if you are free to leave',
      'Right to legal representation',
      'Right to record police in public'
    ],
    importantNotes: [
      'Alaska Constitution provides stronger privacy protections than federal law',
      'No stop and identify requirement',
      'Recording police is explicitly protected under Alaska law'
    ],
    stopAndIdentify: false,
    recordingLegal: true,
    lastUpdated: '2024-01-15'
  },

  'Arizona': {
    summary: 'Arizona has specific laws regarding police encounters. Citizens must provide identification when lawfully detained. You have the right to remain silent and refuse consent searches.',
    keyRights: [
      'Right to remain silent',
      'Right to refuse consent searches',
      'Right to ask if you are free to leave',
      'Right to attorney during questioning',
      'Right to record police interactions'
    ],
    importantNotes: [
      'Arizona has stop and identify laws - must provide ID when lawfully detained',
      'SB 1070 allows police to check immigration status during lawful stops',
      'Recording police is legal but must not interfere with duties'
    ],
    stopAndIdentify: true,
    recordingLegal: true,
    lastUpdated: '2024-01-15'
  },

  'Arkansas': {
    summary: 'Arkansas follows federal constitutional protections during police encounters. Citizens have the right to remain silent, refuse searches, and ask if they are free to leave.',
    keyRights: [
      'Right to remain silent',
      'Right to refuse consent searches',
      'Right to ask if you are free to leave',
      'Right to legal counsel',
      'Right to record police in public'
    ],
    importantNotes: [
      'No specific stop and identify statute',
      'Recording police is legal in public spaces',
      'Consent searches must be voluntary and can be withdrawn'
    ],
    stopAndIdentify: false,
    recordingLegal: true,
    lastUpdated: '2024-01-15'
  },

  'California': {
    summary: 'California provides strong protections during police encounters. Citizens have the right to remain silent, refuse searches, and record police. California has specific laws protecting these rights.',
    keyRights: [
      'Right to remain silent',
      'Right to refuse consent searches',
      'Right to ask if you are free to leave',
      'Right to attorney during questioning',
      'Right to record police interactions'
    ],
    importantNotes: [
      'California has strong privacy protections under state constitution',
      'No stop and identify requirement',
      'AB 748 requires police to release body camera footage',
      'Sanctuary state laws limit cooperation with federal immigration enforcement'
    ],
    stopAndIdentify: false,
    recordingLegal: true,
    lastUpdated: '2024-01-15'
  },

  'Colorado': {
    summary: 'Colorado follows federal constitutional protections with some additional state-specific provisions. Citizens have standard constitutional rights during police encounters.',
    keyRights: [
      'Right to remain silent',
      'Right to refuse consent searches',
      'Right to ask if you are free to leave',
      'Right to legal representation',
      'Right to record police'
    ],
    importantNotes: [
      'Stop and identify laws apply when lawfully detained',
      'Recording police is legal in public spaces',
      'Colorado has specific laws regarding marijuana possession'
    ],
    stopAndIdentify: true,
    recordingLegal: true,
    lastUpdated: '2024-01-15'
  },

  'Connecticut': {
    summary: 'Connecticut provides constitutional protections during police encounters. Citizens have the right to remain silent, refuse searches, and record police interactions.',
    keyRights: [
      'Right to remain silent',
      'Right to refuse consent searches',
      'Right to ask if you are free to leave',
      'Right to attorney during questioning',
      'Right to record police'
    ],
    importantNotes: [
      'No stop and identify requirement',
      'Recording police is legal and protected',
      'Connecticut has police accountability laws'
    ],
    stopAndIdentify: false,
    recordingLegal: true,
    lastUpdated: '2024-01-15'
  },

  'Delaware': {
    summary: 'Delaware follows federal constitutional protections during police encounters. Citizens have standard rights to remain silent, refuse searches, and ask if they are free to leave.',
    keyRights: [
      'Right to remain silent',
      'Right to refuse consent searches',
      'Right to ask if you are free to leave',
      'Right to legal counsel',
      'Right to record police'
    ],
    importantNotes: [
      'Stop and identify laws apply during lawful detention',
      'Recording police is legal in public',
      'Small state with consistent statewide policies'
    ],
    stopAndIdentify: true,
    recordingLegal: true,
    lastUpdated: '2024-01-15'
  },

  'Florida': {
    summary: 'Florida has specific laws regarding police encounters. Citizens must provide identification when lawfully detained and have standard constitutional rights.',
    keyRights: [
      'Right to remain silent',
      'Right to refuse consent searches',
      'Right to ask if you are free to leave',
      'Right to attorney during questioning',
      'Right to record police'
    ],
    importantNotes: [
      'Florida has stop and identify laws',
      'Recording police is legal but regulated',
      'Stand Your Ground laws affect some police encounter situations'
    ],
    stopAndIdentify: true,
    recordingLegal: true,
    lastUpdated: '2024-01-15'
  },

  'Georgia': {
    summary: 'Georgia follows federal constitutional protections with stop and identify requirements. Citizens have the right to remain silent and refuse consent searches.',
    keyRights: [
      'Right to remain silent',
      'Right to refuse consent searches',
      'Right to ask if you are free to leave',
      'Right to legal representation',
      'Right to record police'
    ],
    importantNotes: [
      'Stop and identify laws require ID during lawful detention',
      'Recording police is legal in public spaces',
      'Georgia has specific laws regarding traffic stops'
    ],
    stopAndIdentify: true,
    recordingLegal: true,
    lastUpdated: '2024-01-15'
  },

  // Continue with remaining states...
  'Hawaii': {
    summary: 'Hawaii provides constitutional protections during police encounters with strong privacy rights under state constitution.',
    keyRights: [
      'Right to remain silent',
      'Right to refuse consent searches',
      'Right to ask if you are free to leave',
      'Right to attorney during questioning',
      'Right to record police'
    ],
    importantNotes: [
      'No stop and identify requirement',
      'Strong state constitutional privacy protections',
      'Recording police is legal and protected'
    ],
    stopAndIdentify: false,
    recordingLegal: true,
    lastUpdated: '2024-01-15'
  },

  'Illinois': {
    summary: 'Illinois provides constitutional protections during police encounters. Citizens have the right to remain silent, refuse searches, and record police interactions.',
    keyRights: [
      'Right to remain silent',
      'Right to refuse consent searches',
      'Right to ask if you are free to leave',
      'Right to legal counsel',
      'Right to record police'
    ],
    importantNotes: [
      'Stop and identify laws apply during lawful detention',
      'Recording police is explicitly legal under state law',
      'Illinois has police reform legislation'
    ],
    stopAndIdentify: true,
    recordingLegal: true,
    lastUpdated: '2024-01-15'
  },

  'New York': {
    summary: 'New York provides constitutional protections during police encounters with additional state-specific rights. Citizens can refuse searches and record police interactions.',
    keyRights: [
      'Right to remain silent',
      'Right to refuse consent searches',
      'Right to ask if you are free to leave',
      'Right to attorney during questioning',
      'Right to record police interactions'
    ],
    importantNotes: [
      'Stop and identify laws apply during lawful detention',
      'Recording police is legal and protected by state law',
      'NYC has additional local protections and oversight',
      'Right to Know Act requires officers to identify themselves and explain stops'
    ],
    stopAndIdentify: true,
    recordingLegal: true,
    lastUpdated: '2024-01-15'
  },

  'Texas': {
    summary: 'Texas has specific laws regarding police encounters including stop and identify requirements. Citizens have constitutional rights to remain silent and refuse consent searches.',
    keyRights: [
      'Right to remain silent',
      'Right to refuse consent searches',
      'Right to ask if you are free to leave',
      'Right to attorney during questioning',
      'Right to record police'
    ],
    importantNotes: [
      'Texas has stop and identify laws - must provide name when lawfully detained',
      'Recording police is legal in public spaces',
      'Open carry laws affect some police encounters',
      'Border areas may have additional federal law enforcement presence'
    ],
    stopAndIdentify: true,
    recordingLegal: true,
    lastUpdated: '2024-01-15'
  }
}

// Helper function to get state data
export const getStateData = (state) => {
  return STATE_LEGAL_DATA[state] || null
}

// Helper function to get all available states
export const getAvailableStates = () => {
  return Object.keys(STATE_LEGAL_DATA).sort()
}

// Helper function to check if recording is legal in a state
export const isRecordingLegal = (state) => {
  const stateData = getStateData(state)
  return stateData ? stateData.recordingLegal : true // Default to true if unknown
}

// Helper function to check if state has stop and identify laws
export const hasStopAndIdentify = (state) => {
  const stateData = getStateData(state)
  return stateData ? stateData.stopAndIdentify : false // Default to false if unknown
}
