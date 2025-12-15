import { useState, useEffect } from 'react'
import styles from './SettingsModal.module.css'

export interface Payment {
  id: string
  name: string
  percentage: string
  due: string
}

interface PaymentTermsModalProps {
  payments: Payment[]
  onSave: (payments: Payment[]) => void
  onClose: () => void
}

export default function PaymentTermsModal({ payments: initialPayments, onSave, onClose }: PaymentTermsModalProps) {
  const [payments, setPayments] = useState<Payment[]>(initialPayments)
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
  const [draggedId, setDraggedId] = useState<string | null>(null)

  useEffect(() => {
    setPayments(initialPayments)
  }, [initialPayments])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest(`.${styles.dueCell}`) && !target.closest(`.${styles.dueDropdown}`)) {
        setOpenDropdownId(null)
      }
    }
    if (openDropdownId) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openDropdownId])

  const calculateTotalPercentage = (payments: Payment[]): number => {
    return payments.reduce((sum, payment) => {
      return sum + parseFloat(payment.percentage || '0')
    }, 0)
  }


  const handlePaymentChange = (id: string, field: keyof Payment, newValue: string) => {
    setPayments(prev => {
      return prev.map(payment => {
        if (payment.id === id) {
          return { ...payment, [field]: newValue }
        }
        return payment
      })
    })
  }


  const handleDeletePayment = (id: string) => {
    if (payments.length <= 1) return // Don't allow deleting the last payment
    setPayments(prev => prev.filter(payment => payment.id !== id))
  }

  const handleDragStart = (id: string) => {
    setDraggedId(id)
  }

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault()
    if (draggedId === null || draggedId === id) return

    const draggedIndex = payments.findIndex(p => p.id === draggedId)
    const targetIndex = payments.findIndex(p => p.id === id)

    if (draggedIndex === -1 || targetIndex === -1) return

    const updated = [...payments]
    const [removed] = updated.splice(draggedIndex, 1)
    updated.splice(targetIndex, 0, removed)
    setPayments(updated)
    setDraggedId(id)
  }

  const handleDragEnd = () => {
    setDraggedId(null)
  }

  const handleAddPayment = () => {
    const newId = Date.now().toString()
    const newPayment: Payment = {
      id: newId,
      name: `Payment ${payments.length + 1}`,
      percentage: '0',
      due: 'On approval'
    }
    
    setPayments(prev => [...prev, newPayment])
  }

  const totalPercentage = calculateTotalPercentage(payments)
  const exceeds100 = totalPercentage > 100

  const handleSave = () => {
    onSave(payments)
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Payment terms</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.content}>
          <div className={styles.formField}>
            <h3 className={styles.sectionTitle}>Payment schedule</h3>
            <div className={styles.paymentTable}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Due</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, index) => {
                    const isLast = index === payments.length - 1
                    const isDropdownOpen = openDropdownId === payment.id
                    const canDelete = payments.length > 1
                    const isDragging = draggedId === payment.id
                    
                    return (
                      <tr
                        key={payment.id}
                        draggable
                        onDragStart={() => handleDragStart(payment.id)}
                        onDragOver={(e) => handleDragOver(e, payment.id)}
                        onDragEnd={handleDragEnd}
                        className={isDragging ? styles.draggingRow : ''}
                      >
                        <td>
                          <div className={styles.nameCell}>
                            <div className={styles.dragHandle}>⋮⋮</div>
                            <input
                              type="text"
                              className={styles.tableInput}
                              value={payment.name}
                              onChange={(e) => handlePaymentChange(payment.id, 'name', e.target.value)}
                              onKeyDown={(e) => {
                                if ((e.metaKey || e.ctrlKey) && e.key === 'a') {
                                  e.preventDefault()
                                  ;(e.target as HTMLInputElement).select()
                                }
                              }}
                            />
                          </div>
                        </td>
                        <td>
                          <div className={styles.amountCell}>
                            <div className={styles.inputWithSuffix}>
                              <input
                                type="number"
                                className={`${styles.tableInput} ${isLast && exceeds100 ? styles.inputError : ''}`}
                                value={payment.percentage}
                                onChange={(e) => handlePaymentChange(payment.id, 'percentage', e.target.value)}
                                onKeyDown={(e) => {
                                  if ((e.metaKey || e.ctrlKey) && e.key === 'a') {
                                    e.preventDefault()
                                    ;(e.target as HTMLInputElement).select()
                                  }
                                }}
                                min="0"
                                max="100"
                                step="0.01"
                              />
                              <span className={styles.suffix}>%</span>
                            </div>
                            {isLast && exceeds100 && (
                              <span className={styles.errorMessage}>Total exceeds 100%</span>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className={styles.dueCell}>
                            <button
                              className={styles.dueButton}
                              onClick={() => setOpenDropdownId(isDropdownOpen ? null : payment.id)}
                            >
                              {payment.due}
                            </button>
                            {isDropdownOpen && (
                              <div className={styles.dueDropdown}>
                                <label className={styles.radioOption}>
                                  <input
                                    type="radio"
                                    name={`due-${payment.id}`}
                                    value="On approval"
                                    checked={payment.due === 'On approval'}
                                    onChange={(e) => {
                                      handlePaymentChange(payment.id, 'due', e.target.value)
                                      setOpenDropdownId(null)
                                    }}
                                  />
                                  <span>On approval</span>
                                </label>
                                <label className={styles.radioOption}>
                                  <input
                                    type="radio"
                                    name={`due-${payment.id}`}
                                    value="On completion"
                                    checked={payment.due === 'On completion'}
                                    onChange={(e) => {
                                      handlePaymentChange(payment.id, 'due', e.target.value)
                                      setOpenDropdownId(null)
                                    }}
                                  />
                                  <span>On completion</span>
                                </label>
                                <label className={styles.radioOption}>
                                  <input
                                    type="radio"
                                    name={`due-${payment.id}`}
                                    value="Specific date"
                                    checked={payment.due === 'Specific date'}
                                    onChange={(e) => {
                                      handlePaymentChange(payment.id, 'due', e.target.value)
                                      setOpenDropdownId(null)
                                    }}
                                  />
                                  <span>Specific date</span>
                                </label>
                              </div>
                            )}
                          </div>
                        </td>
                        <td>
                          {canDelete && (
                            <button
                              className={styles.deleteButton}
                              onClick={() => handleDeletePayment(payment.id)}
                              title="Delete payment"
                            >
                              ×
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <button className={styles.addPaymentButton} onClick={handleAddPayment}>
                +
              </button>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.secondaryButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.primaryButton} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

