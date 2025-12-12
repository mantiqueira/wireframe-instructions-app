import { useState } from 'react'
import GeneralSettingsModal from '../components/GeneralSettingsModal'
import PricingPresetsModal from '../components/PricingPresetsModal'
import PaymentPresetsModal from '../components/PaymentPresetsModal'
import AIPersonalityModal from '../components/AIPersonalityModal'
import ProfitMarginModal from '../components/ProfitMarginModal'
import PaymentTermsModal from '../components/PaymentTermsModal'
import DepositModal from '../components/DepositModal'
import TaxRateModal from '../components/TaxRateModal'
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
  const [showProfitMarginModal, setShowProfitMarginModal] = useState(false)
  const [showPaymentTermsModal, setShowPaymentTermsModal] = useState(false)
  const [showDepositModal, setShowDepositModal] = useState(false)
  const [showTaxRateModal, setShowTaxRateModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showAIModal, setShowAIModal] = useState(false)

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
              <h3 className={styles.settingTitle}>Profit margin per project</h3>
              <p className={styles.settingDescription}>Minimum: {minProfitMargin}, Maximum: {maxProfitMargin}</p>
            </div>
            <button className={styles.customizeButton} onClick={() => setShowProfitMarginModal(true)}>
              Customize
            </button>
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
            <button className={styles.customizeButton} onClick={() => setShowPaymentTermsModal(true)}>
              {paymentTerms}
            </button>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <h3 className={styles.settingTitle}>Deposit</h3>
              <p className={styles.settingDescription}>
                {requireDeposit === 'Yes' 
                  ? `Require deposit: ${requireDeposit}, Percentage: ${depositPercentage}`
                  : `Require deposit: ${requireDeposit}`
                }
              </p>
            </div>
            <button className={styles.customizeButton} onClick={() => setShowDepositModal(true)}>
              Customize
            </button>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <h3 className={styles.settingTitle}>Tax rate</h3>
              <p className={styles.settingDescription}>Default tax rate for calculations</p>
            </div>
            <button className={styles.customizeButton} onClick={() => setShowTaxRateModal(true)}>
              {taxRate}
            </button>
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
          onSave={(data) => {
            setMarkupOption(data.markupOption)
            setLaborMarkup(data.laborMarkup)
            setMaterialMarkup(data.materialMarkup)
            setLaborMaterialMarkup(data.laborMaterialMarkup)
            setOtherMarkup(data.otherMarkup)
            setShowPricingModal(false)
          }}
          onClose={() => setShowPricingModal(false)}
        />
      )}

      {showProfitMarginModal && (
        <ProfitMarginModal
          minValue={minProfitMargin}
          maxValue={maxProfitMargin}
          onSave={(data) => {
            setMinProfitMargin(data.minValue)
            setMaxProfitMargin(data.maxValue)
            setShowProfitMarginModal(false)
          }}
          onClose={() => setShowProfitMarginModal(false)}
        />
      )}

      {showPaymentTermsModal && (
        <PaymentTermsModal
          value={paymentTerms}
          onSave={(value) => {
            setPaymentTerms(value)
            setShowPaymentTermsModal(false)
          }}
          onClose={() => setShowPaymentTermsModal(false)}
        />
      )}

      {showDepositModal && (
        <DepositModal
          requireDeposit={requireDeposit}
          depositPercentage={depositPercentage}
          onSave={(data) => {
            setRequireDeposit(data.requireDeposit)
            setDepositPercentage(data.depositPercentage)
            setShowDepositModal(false)
          }}
          onClose={() => setShowDepositModal(false)}
        />
      )}

      {showTaxRateModal && (
        <TaxRateModal
          value={taxRate}
          onSave={(value) => {
            setTaxRate(value)
            setShowTaxRateModal(false)
          }}
          onClose={() => setShowTaxRateModal(false)}
        />
      )}

      {showPaymentModal && (
        <PaymentPresetsModal
          paymentMethods={paymentMethods}
          onSave={(data) => {
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
