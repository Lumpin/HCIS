package HCIS.MENES.controller;

import HCIS.MENES.constant.Status;
import HCIS.MENES.dto.*;
import HCIS.MENES.entity.MedicalRecord;
import HCIS.MENES.entity.Physician;
import HCIS.MENES.entity.Treatment;
import HCIS.MENES.entity.User;
import HCIS.MENES.repositories.MedicalRecordRespository;
import HCIS.MENES.repositories.PhysicianRepository;
import HCIS.MENES.repositories.TreatmentRepository;
import HCIS.MENES.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Objects;
import java.util.Optional;


/*  Controller class for physicians with endpoints

 */
@RestController
public class PhysicianController {

    @Autowired
    private TreatmentRepository treatmentRepository;
    @Autowired
    private PhysicianRepository physicianRepository;
    @Autowired
    private MedicalRecordRespository medicalRecordRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ModelMapper modelMapper;

    /**
     *  endpoint for updating physician
     *
     * @param principal representing physician
     * @param physicianUpdateDto dto for updating physician
     * @return response message if physician is updated
     */
    @PutMapping("/updatephysician")
    @PreAuthorize("hasRole('PHYSICIAN')")
    public ResponseEntity<?> updatePhysicianDetail(Principal principal, @RequestBody PhysicianUpdateDto physicianUpdateDto){
        User user = userRepository.findUserByUsername(principal.getName());
        Physician physician = physicianRepository.getphysicianbyusername(principal.getName());
        Physician newPhysician = modelMapper.map(physicianUpdateDto,Physician.class);
        newPhysician.setId(physician.getId());
        newPhysician.setUser(physician.getUser());
        physician = physicianRepository.save(newPhysician);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * endpoint for receiving physician detail
     *
     * @param principal representing physician
     * @return response dto of physician
     */
    @GetMapping("/getphysiciandetail")
    @PreAuthorize("hasRole('PHYSICIAN')")
    public ResponseEntity<?> getPhysicianDetail(Principal principal){
        Physician physician = physicianRepository.getphysicianbyusername(principal.getName());
        PhysicianGetResponseDto physicianGetResponseDto = modelMapper.map(physician,PhysicianGetResponseDto.class);
        return new ResponseEntity<>(physicianGetResponseDto,HttpStatus.OK);
    }

    /**
     *
     * endpoint for making a treatment
     *
     * @param principal representing physician
     * @param createUpdateTreatmentDto dto for updating treatment
     * @param medicalRecordId id of medical record
     * @return response message for successfully adding a treatment
     * @throws Exception thrown if the medical record cannot be found
     */
    @PostMapping("/maketreatment")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<?> makeMedicalTreatment(Principal principal, @RequestBody CreateUpdateTreatmentDto createUpdateTreatmentDto
            ,@RequestParam Long medicalRecordId) throws Exception{

        User user = userRepository.findUserByUsername(principal.getName());
        Treatment treatment = modelMapper.map(createUpdateTreatmentDto,Treatment.class);
        MedicalRecord medicalRecord = medicalRecordRepository.getOne(medicalRecordId);
        if(medicalRecord == null){
            throw new Exception("Medical Record Not Found");
        }
        medicalRecord.setTreatment(treatment);
        medicalRecord = medicalRecordRepository.save(medicalRecord);
        return new ResponseEntity<>(HttpStatus.OK);

    }

    /**
     * endpoint for receiving list of all medical records of patients
     *
     * @param principal represents physician
     * @return dto of medical records list
     */
    @GetMapping("/getPatients")
    @PreAuthorize("hasRole('PHYSICIAN')")
    public ResponseEntity<?> getAllPatients(Principal principal){

        List<MedicalRecord> medicalRecordList = medicalRecordRepository.getMedicalRecords(principal.getName());
        PhysiciansMedicalRecordGetListDto  physiciansMedicalRecordGetListDto = new PhysiciansMedicalRecordGetListDto();
        for (MedicalRecord record:medicalRecordList
        ) {
            if (record.getStatus().toString().equals(Status.DISMISS.toString()))
                continue;
            physiciansMedicalRecordGetListDto.addToList(record);
        }
        return new ResponseEntity<>(physiciansMedicalRecordGetListDto,HttpStatus.OK);

    }

    /**
     *
     * @param principal represents physician
     * @param createUpdateTreatmentDto dto of updated treatment
     * @return null
     */
    @PutMapping
    @PreAuthorize("hasRole('PHYSICIAN')")
    public ResponseEntity<?> updatePatientTreatment(Principal principal, @RequestBody CreateUpdateTreatmentDto
            createUpdateTreatmentDto) {
        return null;

    }

    /**
     * endpoint for receiving patient details
     *
     * @param patientid id of patient
     * @return medical record of patient with id patientId
     */
    @GetMapping("/getpatientDetails")
    @PreAuthorize("hasRole('PHYSICIAN')")
    public ResponseEntity<?> getPatientMedicalRecords(@RequestParam Long patientid){
        return new ResponseEntity<>(medicalRecordRepository.getMedicalRecordsfromPatientId(patientid),HttpStatus.OK);
    }

    /**
     * endpoint for receiving medical record by id
     *
     * @param medicalid id of medical record
     * @return medical record
     * @throws Exception thrown when no medical record can be found
     */
    @GetMapping("/getmedicalrecordbyid")
    @PreAuthorize("hasRole('PHYSICIAN')")
    public ResponseEntity<?> getMedicalRecordById(@RequestParam Long medicalid) throws Exception{
        MedicalRecord medicalRecord=medicalRecordRepository.getOne(medicalid);
        if(Objects.isNull(medicalRecord))
            throw new Exception("No medical record found");
        return new ResponseEntity<>(medicalRecord,HttpStatus.OK);
    }

    /**
     * endpoint for updating medical record
     *
     * @param medicalRecord medical record to add
     * @return status message if medical record is successfully added
     * @throws Exception thrown when id of medical record is not valid
     */
    @PutMapping("/updatemedicalrecord")
    @PreAuthorize("hasRole('PHYSICIAN')")
    public ResponseEntity<?> updateMedicalRecord(@RequestParam MedicalRecord medicalRecord)
            throws Exception{
        if(Objects.isNull(medicalRecord.getId()))
            throw new Exception("The id is not valid");

        medicalRecordRepository.save(medicalRecord);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * endpoint for updating treatment
     *
     * @param recordId id of medical record
     * @param treatmentUpdateDto dto of treatment to add to medical record
     * @return response message if treatment is successfully updated
     * @throws Exception thrown when medical record cannot be found
     */
    @PutMapping("/updatetreatment")
    @PreAuthorize("hasRole('PHYSICIAN')")
    public ResponseEntity<?> updateTreatment(@RequestParam Long recordId,@RequestBody TreatmentUpdateDto treatmentUpdateDto)
            throws Exception{
        Treatment treatment = modelMapper.map(treatmentUpdateDto,Treatment.class);
        Optional<MedicalRecord> medicalRecord = medicalRecordRepository.findById(recordId);
        if(!medicalRecord.isPresent())
            throw new Exception("Medical record not found");
        treatment.setId(medicalRecord.get().getTreatment().getId());
        treatment = treatmentRepository.save(treatment);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * endpoint for dismissing the medical record of a patient
     *
     * @param recordid id of medical record
     * @return response message if medical record of patient is successfully dismissed
     * @throws Exception thrown when medical record cannot be found
     */
    @PostMapping("/dismissPatient")
    @PreAuthorize("hasRole('PHYSICIAN')")
    public ResponseEntity<?> dismissPatient(@RequestParam Long recordid) throws Exception{
        Optional<MedicalRecord> medicalRecord = medicalRecordRepository.findById(recordid);
        if(!medicalRecord.isPresent())
            throw new Exception("Medical record not found");
        medicalRecord.get().setStatus(Status.DISMISS);
        medicalRecordRepository.save(medicalRecord.get());
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
