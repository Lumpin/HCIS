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


/*  Controller class for physicians with endpoints: /updatePhysician, /getPhysicianDetails, /makeTreatment, /getPatients, /getPatientDetails,
    /getMedicalRecordById, /updateMedicalRecord, /updateTreatment, /dismissTreatment

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
     *
     * @param principal
     * @param physicianUpdateDto
     * @return
     */
    @PutMapping("/updatePhysician")
    @PreAuthorize("hasRole('PHYSICIAN')")
    public ResponseEntity<?> updatePhysicianDetail(Principal principal, @RequestBody PhysicianUpdateDto physicianUpdateDto) {
        User user = userRepository.findUserByUsername(principal.getName());
        Physician physician = physicianRepository.getPhysicianByUsername(principal.getName());
        Physician newPhysician = modelMapper.map(physicianUpdateDto, Physician.class);
        newPhysician.setId(physician.getId());
        newPhysician.setUser(physician.getUser());
        physician = physicianRepository.save(newPhysician);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     *
     * @param principal
     * @return
     */
    @GetMapping("/getPhysicianDetail")
    @PreAuthorize("hasRole('PHYSICIAN')")
    public ResponseEntity<?> getPhysicianDetail(Principal principal) {
        Physician physician = physicianRepository.getPhysicianByUsername(principal.getName());
        PhysicianGetResponseDto physicianGetResponseDto = modelMapper.map(physician, PhysicianGetResponseDto.class);
        return new ResponseEntity<>(physicianGetResponseDto, HttpStatus.OK);
    }

    /**
     *
     * @param principal
     * @param createUpdateTreatmentDto
     * @param medicalRecordId
     * @return
     * @throws Exception
     */
    @PostMapping("/makeTreatment")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<?> makeMedicalTreatment(Principal principal, @RequestBody CreateUpdateTreatmentDto createUpdateTreatmentDto
            , @RequestParam Long medicalRecordId) throws Exception {

        User user = userRepository.findUserByUsername(principal.getName());
        Treatment treatment = modelMapper.map(createUpdateTreatmentDto, Treatment.class);
        MedicalRecord medicalRecord = medicalRecordRepository.getOne(medicalRecordId);
        if (medicalRecord == null) {
            throw new Exception("Medical Record Not Found");
        }
        medicalRecord.setTreatment(treatment);
        medicalRecord = medicalRecordRepository.save(medicalRecord);
        return new ResponseEntity<>(HttpStatus.OK);

    }

    /**
     *
     * @param principal
     * @return
     */
    @GetMapping("/getPatients")
    @PreAuthorize("hasRole('PHYSICIAN')")
    public ResponseEntity<?> getAllPatients(Principal principal) {

        List<MedicalRecord> medicalRecordList = medicalRecordRepository.getMedicalRecords(principal.getName());
        PhysiciansMedicalRecordGetListDto physiciansMedicalRecordGetListDto = new PhysiciansMedicalRecordGetListDto();
        for (MedicalRecord record : medicalRecordList
        ) {
            if (record.getStatus().toString().equals(Status.DISMISS.toString()))
                continue;
            physiciansMedicalRecordGetListDto.addToList(record);
        }
        return new ResponseEntity<>(physiciansMedicalRecordGetListDto, HttpStatus.OK);

    }

    /**
     *
     * @param principal
     * @param createUpdateTreatmentDto
     * @return
     */
    @PutMapping
    @PreAuthorize("hasRole('PHYSICIAN')")
    public ResponseEntity<?> updatePatientTreatment(Principal principal, @RequestBody CreateUpdateTreatmentDto
            createUpdateTreatmentDto) {
        return null;

    }

    /**
     *
     * @param patientid
     * @return
     */
    @GetMapping("/getPatientDetails")
    @PreAuthorize("hasRole('PHYSICIAN')")
    public ResponseEntity<?> getPatientMedicalRecords(@RequestParam Long patientid) {
        return new ResponseEntity<>(medicalRecordRepository.getMedicalRecordsFromPatientId(patientid), HttpStatus.OK);
    }

    /**
     *
     * @param medicalid
     * @return
     * @throws Exception
     */
    @GetMapping("/getMedicalRecordById")
    @PreAuthorize("hasRole('PHYSICIAN')")
    public ResponseEntity<?> getMedicalRecordById(@RequestParam Long medicalid) throws Exception {
        MedicalRecord medicalRecord = medicalRecordRepository.getOne(medicalid);
        if (Objects.isNull(medicalRecord))
            throw new Exception("No medical record found");
        return new ResponseEntity<>(medicalRecord, HttpStatus.OK);
    }

    /**
     *
     * @param medicalRecord
     * @return
     * @throws Exception
     */
    @PutMapping("/updateMedicalRecord")
    @PreAuthorize("hasRole('PHYSICIAN')")
    public ResponseEntity<?> updateMedicalRecord(@RequestParam MedicalRecord medicalRecord)
            throws Exception {
        if (Objects.isNull(medicalRecord.getId()))
            throw new Exception("The id is not valid");

        medicalRecordRepository.save(medicalRecord);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     *
     * @param recordId
     * @param treatmentUpdateDto
     * @return
     * @throws Exception
     */
    @PutMapping("/updateTreatment")
    @PreAuthorize("hasRole('PHYSICIAN')")
    public ResponseEntity<?> updateTreatment(@RequestParam Long recordId, @RequestBody TreatmentUpdateDto treatmentUpdateDto)
            throws Exception {
        Treatment treatment = modelMapper.map(treatmentUpdateDto, Treatment.class);
        Optional<MedicalRecord> medicalRecord = medicalRecordRepository.findById(recordId);
        if (!medicalRecord.isPresent())
            throw new Exception("Medical record not found");
        treatment.setId(medicalRecord.get().getTreatment().getId());
        treatment = treatmentRepository.save(treatment);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     *
     * @param recordid
     * @return
     * @throws Exception
     */
    @PostMapping("dismissPatient")
    @PreAuthorize("hasRole('PHYSICIAN')")
    public ResponseEntity<?> dismissPatient(@RequestParam Long recordid) throws Exception {
        Optional<MedicalRecord> medicalRecord = medicalRecordRepository.findById(recordid);
        if (!medicalRecord.isPresent())
            throw new Exception("Medical record not found");
        medicalRecord.get().setStatus(Status.DISMISS);
        medicalRecordRepository.save(medicalRecord.get());
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
