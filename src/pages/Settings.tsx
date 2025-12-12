import { useState } from 'react'
import GeneralSettingsModal from '../components/GeneralSettingsModal'
import PricingPresetsModal from '../components/PricingPresetsModal'
import PaymentPresetsModal from '../components/PaymentPresetsModal'
import AIPersonalityModal from '../components/AIPersonalityModal'
import styles from './Settings.module.css'

export default function Settings() {
  // General settings
  const [companyName, setCompanyName] = useState('T2 General Contractors LLC')
  const [licenseNumber, setLicenseNumber] = useState('123456789')
  const [phone, setPhone] = useState('987654321')
  const [email, setEmail] = useState('john@t2gc.com')
  const [address, setAddress] = useState('Street of streets 1234')

  // Pricing presets
  const [markupOption, setMarkupOption] = useState('Use defaults everytime.')
  const [laborMarkup, setLaborMarkup] = useState('30%')
  const [materialMarkup, setMaterialMarkup] = useState('15%')
  const [laborMaterialMarkup, setLaborMaterialMarkup] = useState('20%')
  const [otherMarkup, setOtherMarkup] = useState('5%')
  const [minProfitMargin, setMinProfitMargin] = useState('20%')
  const [maxProfitMargin, setMaxProfitMargin] = useState('80%')

  // Payment presets
  const [paymentTerms, setPaymentTerms] = useState('(Net 15/30/45/60)')
  const [requireDeposit, setRequireDeposit] = useState('Yes')
  const [depositPercentage, setDepositPercentage] = useState('20%')
  const [taxRate, setTaxRate] = useState('5.87%')
  const [paymentMethods, setPaymentMethods] = useState({
    debitCredit: true,
    achTransfer: true,
    none: true,
    other: true
  })

  // AI personality
  const [clientTone, setClientTone] = useState('Professional')
  const [clientLength, setClientLength] = useState('Thorough')
  const [teamTone, setTeamTone] = useState('Friendly')
  const [teamLength, setTeamLength] = useState('Concise')

  // Modal states
  const [showGeneralModal, setShowGeneralModal] = useState(false)
  const [showPricingModal, setShowPricingModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showAIModal, setShowAIModal] = useState(false)

  const getPaymentMethodsSummary = () => {
    const methods = []
    if (paymentMethods.debitCredit) methods.push('Debit/Credit')
    if (paymentMethods.achTransfer) methods.push('ACH')
    if (paymentMethods.none) methods.push('None')
    if (paymentMethods.other) methods.push('Other')
    return methods.length > 0 ? methods.join(', ') : 'None selected'
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Settings/Presets or defaults values</h1>

      {/* General settings */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>General settings</h2>
        <p className={styles.sectionSubtitle}>Default stuff inside handoff.</p>
        
        <div className={styles.settingsCard}>
          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <h3 className={styles.settingTitle}>Company information</h3>
              <p className={styles.settingDescription}>Company name, license, contact details, and address</p>
            </div>
            <button className={styles.customizeButton} onClick={() => setShowGeneralModal(true)}>
              Customize
            </button>
          </div>
        </div>
      </section>

      {/* Pricing presets */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Pricing presets</h2>
        
        <div className={styles.settingsCard}>
          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <h3 className={styles.settingTitle}>Markups</h3>
              <p className={styles.settingDescription}>Configure labor, material, and other markup percentages</p>
            </div>
            <button className={styles.customizeButton} onClick={() => setShowPricingModal(true)}>
              Customize
            </button>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <h3 className={styles.settingTitle}>Minimum profit margin per project</h3>
              <p className={styles.settingDescription}>Set the minimum profit margin percentage</p>
            </div>
            <select
              className={styles.select}
              value={minProfitMargin}
              onChange={(e) => setMinProfitMargin(e.target.value)}
            >
              <option>10%</option>
              <option>15%</option>
              <option>20%</option>
              <option>25%</option>
              <option>30%</option>
            </select>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <h3 className={styles.settingTitle}>Maximum profit margin per project</h3>
              <p className={styles.settingDescription}>Set the maximum profit margin percentage</p>
            </div>
            <select
              className={styles.select}
              value={maxProfitMargin}
              onChange={(e) => setMaxProfitMargin(e.target.value)}
            >
              <option>50%</option>
              <option>60%</option>
              <option>70%</option>
              <option>80%</option>
              <option>90%</option>
            </select>
          </div>
        </div>
      </section>

      {/* Payment presets */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Payment presets</h2>
        
        <div className={styles.settingsCard}>
          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <h3 className={styles.settingTitle}>Payment terms</h3>
              <p className={styles.settingDescription}>Set default payment terms for invoices</p>
            </div>
            <select
              className={styles.select}
              value={paymentTerms}
              onChange={(e) => setPaymentTerms(e.target.value)}
            >
              <option>(Net 15/30/45/60)</option>
              <option>Net 15</option>
              <option>Net 30</option>
              <option>Net 45</option>
              <option>Net 60</option>
            </select>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <h3 className={styles.settingTitle}>Require deposit</h3>
              <p className={styles.settingDescription}>Whether to require a deposit by default</p>
            </div>
            <select
              className={styles.select}
              value={requireDeposit}
              onChange={(e) => setRequireDeposit(e.target.value)}
            >
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <h3 className={styles.settingTitle}>Deposit percentage</h3>
              <p className={styles.settingDescription}>Default deposit percentage when required</p>
            </div>
            <select
              className={styles.select}
              value={depositPercentage}
              onChange={(e) => setDepositPercentage(e.target.value)}
            >
              <option>10%</option>
              <option>15%</option>
              <option>20%</option>
              <option>25%</option>
              <option>30%</option>
            </select>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <h3 className={styles.settingTitle}>Tax rate</h3>
              <p className={styles.settingDescription}>Default tax rate for calculations</p>
            </div>
            <select
              className={styles.select}
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
            >
              <option>5.87%</option>
              <option>4.5%</option>
              <option>6.0%</option>
              <option>7.0%</option>
            </select>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <h3 className={styles.settingTitle}>Accepted payment methods</h3>
              <p className={styles.settingDescription}>Configure which payment methods are accepted</p>
            </div>
            <button className={styles.customizeButton} onClick={() => setShowPaymentModal(true)}>
              Customize
            </button>
          </div>
        </div>
      </section>

      {/* AI personality */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>AI personality</h2>
        
        <div className={styles.settingsCard}>
          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <h3 className={styles.settingTitle}>Client messages and proposals</h3>
              <p className={styles.settingDescription}>Tone and length for customer-facing communications</p>
            </div>
            <button className={styles.customizeButton} onClick={() => setShowAIModal(true)}>
              Customize
            </button>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <h3 className={styles.settingTitle}>To you and your team</h3>
              <p className={styles.settingDescription}>Tone and length for internal communications</p>
            </div>
            <button className={styles.customizeButton} onClick={() => setShowAIModal(true)}>
              Customize
            </button>
          </div>
        </div>
      </section>

      {/* Modals */}
      {showGeneralModal && (
        <GeneralSettingsModal
          companyName={companyName}
          licenseNumber={licenseNumber}
          phone={phone}
          email={email}
          address={address}
          onSave={(data) => {
            setCompanyName(data.companyName)
            setLicenseNumber(data.licenseNumber)
            setPhone(data.phone)
            setEmail(data.email)
            setAddress(data.address)
            setShowGeneralModal(false)
          }}
          onClose={() => setShowGeneralModal(false)}
        />
      )}

      {showPricingModal && (
        <PricingPresetsModal
          markupOption={markupOption}
          laborMarkup={laborMarkup}
          materialMarkup={materialMarkup}
          laborMaterialMarkup={laborMaterialMarkup}
          otherMarkup={otherMarkup}
          minProfitMargin={minProfitMargin}
          maxProfitMargin={maxProfitMargin}
          onSave={(data) => {
            setMarkupOption(data.markupOption)
            setLaborMarkup(data.laborMarkup)
            setMaterialMarkup(data.materialMarkup)
            setLaborMaterialMarkup(data.laborMaterialMarkup)
            setOtherMarkup(data.otherMarkup)
            setMinProfitMargin(data.minProfitMargin)
            setMaxProfitMargin(data.maxProfitMargin)
            setShowPricingModal(false)
          }}
          onClose={() => setShowPricingModal(false)}
        />
      )}

      {showPaymentModal && (
        <PaymentPresetsModal
          paymentTerms={paymentTerms}
          requireDeposit={requireDeposit}
          depositPercentage={depositPercentage}
          taxRate={taxRate}
          paymentMethods={paymentMethods}
          onSave={(data) => {
            setPaymentTerms(data.paymentTerms)
            setRequireDeposit(data.requireDeposit)
            setDepositPercentage(data.depositPercentage)
            setTaxRate(data.taxRate)
            setPaymentMethods(data.paymentMethods)
            setShowPaymentModal(false)
          }}
          onClose={() => setShowPaymentModal(false)}
        />
      )}

      {showAIModal && (
        <AIPersonalityModal
          clientTone={clientTone}
          clientLength={clientLength}
          teamTone={teamTone}
          teamLength={teamLength}
          onSave={(data) => {
            setClientTone(data.clientTone)
            setClientLength(data.clientLength)
            setTeamTone(data.teamTone)
            setTeamLength(data.teamLength)
            setShowAIModal(false)
          }}
          onClose={() => setShowAIModal(false)}
        />
      )}
    </div>
  )
}
